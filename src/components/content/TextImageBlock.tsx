import { imageAltFromPath } from "../../lib/image-alt";

type TextImageBlockProps = {
  title?: string | null;
  text?: string | null;
  image?: string | null;
};

export default function TextImageBlock({ title, text, image }: TextImageBlockProps) {
  return (
    <section className="flex flex-col-reverse px-6 py-12 min-[850px]:flex-row min-[850px]:px-30 min-[850px]:py-30">
      <div className="flex flex-1 flex-col justify-center">
        {title && <h4 className="font-display-italic text-[28px] leading-[1.05] tracking-[-1px] text-[#121212] min-[850px]:text-[32px] min-[850px]:leading-none">{title}</h4>}
        <div className="mb-5 mt-5 h-1 w-40 bg-[#00fdc7] min-[850px]:mb-4 min-[850px]:mt-[26px] min-[850px]:w-50" />
        {text && <p className="max-w-150 font-sans text-[18px] leading-[1.8] text-[#808080] min-[850px]:text-lg min-[850px]:leading-[2]">{text}</p>}
      </div>
      {image && <div className="mb-8 flex flex-1 items-center justify-center min-[850px]:mb-0 min-[850px]:ml-30"><img className="w-full" src={image} alt={imageAltFromPath(image, title ?? "Project screenshot")} loading="lazy" /></div>}
    </section>
  );
}
