import { imageAltFromPath } from "../../lib/image-alt";

type TriptychPanelsProps = {
  panels: string[];
};

export default function TriptychPanels({ panels }: TriptychPanelsProps) {
  const accessiblePanels = panels.map((panel) => panel.replace(/<img\b([^>]*)\balt=(['"])An Image\2([^>]*)>/gi, (match, before, quote, after) => {
    const src = `${before}${after}`.match(/\bsrc=(['"])(.*?)\1/i)?.[2] ?? "";
    return match.replace(/\balt=(['"])An Image\1/i, `alt=${quote}${imageAltFromPath(src)}${quote}`);
  }));

  return (
    <section className="grid grid-cols-1 gap-5 bg-[#f9f8f9] px-6 py-12 min-[960px]:grid-cols-3 min-[960px]:gap-0 min-[960px]:px-10 min-[960px]:py-30">
      {accessiblePanels.map((panel, index) => (
        <div
          className="px-0 min-[960px]:flex min-[960px]:flex-col min-[960px]:justify-center min-[960px]:px-2.5 min-[960px]:first:pl-0 min-[960px]:last:pr-0 [&_img+img]:mt-2 [&_img+img]:min-[960px]:mt-7.5 [&_img]:w-full [&_img]:shadow-[0_0_20px_#808080] [&_img.no--shadow]:shadow-none"
          dangerouslySetInnerHTML={{ __html: panel }}
          key={index}
        />
      ))}
    </section>
  );
}
