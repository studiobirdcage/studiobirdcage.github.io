export function imageAltFromPath(src: string, fallback = "Project screenshot") {
  const filename = decodeURIComponent(src.split("/").pop() ?? "")
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+-/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return filename || fallback;
}
