import { tagSlug } from "../lib/tags";

type Work = { title: string; slug: string; tags: string[]; image: string };

export default function WorksGrid({ works }: { works: Work[] }) {
  return (
    <div
      className="works-mosaic mb-0 grid auto-rows-65 grid-cols-1 gap-0 bg-[#f4f4f4] min-[960px]:mb-20 md:grid-cols-2"
      data-mosaic-count={works.length}
    >
      {works.map((work, index) => (
        <a
          data-mosaic-position={(index % 10) + 1}
          data-work-tags={work.tags.map(tagSlug).join(",")}
          className="group relative isolate overflow-hidden bg-[#f4f4f4]"
          href={`/works/${work.slug}`}
          key={work.slug}
        >
          <img
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src={work.image}
            alt=""
            loading="lazy"
          />
          <div className="flex h-full flex-col items-center justify-center bg-black/60 p-8 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100 min-[480px]:p-10">
            <span
              aria-hidden="true"
              className="mosaic-terminal-logo solid-icon grid place-items-center rounded-[12%] border-[3px] border-white text-white shadow-[4px_4px_0_#00fdc7]"
            >
              &#xf120;
            </span>
            <h2 className="mosaic-title font-display wrap-break-words max-w-full leading-[1.2] tracking-[-1px] text-white">
              {work.title}
            </h2>
            <span className="my-3 h-0.5 w-[45%] bg-white" />
            <p className="mosaic-tags font-book wrap-break-words max-w-full text-white uppercase">
              {work.tags.map((tag, tagIndex) => (
                <span key={tag}>
                  {tag}
                  {tagIndex < work.tags.length - 1 && <span className="px-2">•</span>}
                </span>
              ))}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
