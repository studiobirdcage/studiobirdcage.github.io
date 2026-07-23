#!/usr/bin/env node

import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const contentTypes = {
  journal: {
    directory: "src/content/posts",
    imageDirectory: "/images/uploads/blog",
    label: "journal entry",
  },
  work: {
    directory: "src/content/works",
    imageDirectory: "/images/uploads/works",
    label: "work case study",
  },
};

const workComponents = [
  { name: "ImageTriptych", path: "../../components/content/ImageTriptych" },
  { name: "TextImageBlock", path: "../../components/content/TextImageBlock" },
  { name: "TriptychPanels", path: "../../components/content/TriptychPanels" },
  { name: "ProjectParagraph", path: "../../components/content/ProjectParagraph" },
];

const today = () => new Date().toISOString().slice(0, 10);
const now = () => new Date().toISOString();

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function quote(value) {
  return JSON.stringify(value);
}

function tags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function imagePath(directory, filename) {
  const normalizedFilename = filename.trim();
  if (
    !normalizedFilename ||
    normalizedFilename.includes("/") ||
    normalizedFilename.includes("\\")
  ) {
    throw new Error("Image values must be filenames only, without a path.");
  }
  return `${directory}/${normalizedFilename}`;
}

function selectedWorkComponents(value) {
  if (!value.trim()) return [];

  const selections = value
    .split(",")
    .map((selection) => Number(selection.trim()))
    .filter((selection) => Number.isInteger(selection));

  if (
    !selections.length ||
    selections.some((selection) => selection < 1 || selection > workComponents.length)
  ) {
    throw new Error("Choose component numbers from the list, separated by commas.");
  }

  return [...new Set(selections)].map((selection) => workComponents[selection - 1]);
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function usage() {
  console.log(`
Create a Studio Birdcage content draft.

Usage:
  npm run content:new
  npm run content:new -- journal
  npm run content:new -- work

The command asks for the frontmatter defined in src/content.config.ts.
New entries default to draft: true so they are not shown in collection-driven indexes.
`);
}

async function main() {
  const requestedType = process.argv[2];

  if (["--help", "-h"].includes(requestedType)) {
    usage();
    return;
  }

  if (requestedType && !contentTypes[requestedType]) {
    console.error(`Unknown content type: ${requestedType}`);
    usage();
    process.exitCode = 1;
    return;
  }

  const rl = createInterface({ input, output });
  const ask = async (label, defaultValue = "") => {
    const suffix = defaultValue === "" ? "" : ` [${defaultValue}]`;
    const answer = (await rl.question(`${label}${suffix}: `)).trim();
    return answer || defaultValue;
  };
  const required = async (label, defaultValue = "") => {
    let value = await ask(label, defaultValue);
    while (!value) {
      console.log("This field is required.");
      value = await ask(label, defaultValue);
    }
    return value;
  };

  try {
    let type = requestedType;
    if (!type) {
      const response = await required("Create a journal entry or work case study? (journal/work)");
      type = response.toLowerCase();
      while (!contentTypes[type]) {
        console.log("Enter either journal or work.");
        type = (
          await required("Create a journal entry or work case study? (journal/work)")
        ).toLowerCase();
      }
    }

    const title = await required("Title");
    const suggestedSlug = slugify(title);
    const slug = await required("Slug", suggestedSlug);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error("Slugs may only use lowercase letters, numbers, and single hyphens.");
    }

    const destination = `${contentTypes[type].directory}/${slug}.mdx`;
    if (await exists(destination)) {
      throw new Error(
        `${destination} already exists. Choose a different slug or rename the existing file.`,
      );
    }

    const date = await required("Publication date (YYYY-MM-DD)", today());
    const draft = (await ask("Create as draft? (yes/no)", "yes")).toLowerCase();
    if (!["yes", "no", "y", "n"].includes(draft)) {
      throw new Error("Draft must be yes or no.");
    }

    const shared = {
      title,
      slug,
      date,
      draft: ["yes", "y"].includes(draft),
    };

    let frontmatter;
    let selectedComponents = [];
    if (type === "journal") {
      const category = await required("Category");
      const categorySlug = await required("Category slug", slugify(category));
      const entryTags = tags(await ask("Tags (comma-separated)", ""));
      const author = await required("Author", "Barrett Long");
      const tagline = await required("Tagline");
      const excerpt = await required("Excerpt");
      const heroImageFilename = await required("Hero image filename");
      const thumbnailImageFilename = await required("Thumbnail image filename", heroImageFilename);
      const heroImage = imagePath(contentTypes.journal.imageDirectory, heroImageFilename);
      const thumbnailImage = imagePath(contentTypes.journal.imageDirectory, thumbnailImageFilename);
      const videoUrl = await ask("Video URL (leave blank for none)", "");

      frontmatter = {
        ...shared,
        category,
        categorySlug,
        tags: entryTags,
        author,
        tagline,
        excerpt,
        heroImage,
        thumbnailImage,
        videoUrl: videoUrl || null,
      };
    } else {
      const publishedAt = await required("Published at (ISO timestamp)", now());
      const featured = (await ask("Feature on home page? (yes/no)", "no")).toLowerCase();
      if (!["yes", "no", "y", "n"].includes(featured)) {
        throw new Error("Featured must be yes or no.");
      }

      const entryTags = tags(await ask("Tags (comma-separated)", ""));
      const heroImageFilename = await required("Hero image filename");
      const thumbnailImageFilename = await required("Thumbnail image filename", heroImageFilename);
      const heroImage = imagePath(contentTypes.work.imageDirectory, heroImageFilename);
      const thumbnailImage = imagePath(contentTypes.work.imageDirectory, thumbnailImageFilename);
      selectedComponents = selectedWorkComponents(
        await ask(
          "Components to import (comma-separated: 1 ImageTriptych, 2 TextImageBlock, 3 TriptychPanels, 4 ProjectParagraph; blank for none)",
          "",
        ),
      );
      const when = await ask("When", "");
      const who = await ask("Who it was for", "");
      const where = await ask("Where", "");
      const what = await ask("What I did", "");
      const how = await ask("How I did it", "");

      frontmatter = {
        ...shared,
        publishedAt,
        featured: ["yes", "y"].includes(featured),
        tags: entryTags,
        heroImage,
        thumbnailImage,
        when: when || null,
        who: who || null,
        where: where || null,
        what: what || null,
        how: how || null,
      };
    }

    const fields = Object.entries(frontmatter)
      .map(([key, value]) => {
        if (value === null) return `${key}: null`;
        if (typeof value === "boolean") return `${key}: ${value}`;
        if (Array.isArray(value)) return `${key}: ${JSON.stringify(value)}`;
        return `${key}: ${quote(value)}`;
      })
      .join("\n");

    const imports =
      type === "work"
        ? selectedComponents.map(({ name, path }) => `import ${name} from "${path}";`).join("\n")
        : "";
    const body =
      type === "journal"
        ? "Start writing your article here.\n"
        : "Write the project overview here.\n";
    const template = `---\n${fields}\n---\n\n${imports}${imports ? "\n\n" : ""}${body}`;

    await mkdir(contentTypes[type].directory, { recursive: true });
    await writeFile(destination, template, "utf8");
    console.log(`\nCreated ${contentTypes[type].label}: ${destination}`);
    console.log("Run npm run format, then npx astro check before publishing.");
  } catch (error) {
    console.error(`\nCould not create content: ${error.message}`);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();
