import { imageAltFromPath } from "../../lib/image-alt";

type ImageTriptychProps = {
  images: string[];
  altTexts?: string[];
  layout?: "triple" | "quad";
};

export default function ImageTriptych({ images, altTexts, layout = "triple" }: ImageTriptychProps) {
  if (layout === "quad") {
    const [one, two, three, four] = images;
    return (
      <section className="flex flex-col bg-[#f9f8f9] px-6 py-12 min-[850px]:flex-row min-[850px]:px-20 min-[850px]:py-30">
        <div className="mb-2.5 flex-1 min-[850px]:mb-0">
          <img
            className="block h-full w-full object-cover shadow-[0_0_20px_#808080] max-[849px]:shadow-none"
            src={one}
            alt={altTexts?.[0] ?? imageAltFromPath(one)}
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col min-[850px]:ml-2.5">
          <div className="mb-2.5 flex flex-1 gap-2.5">
            <img
              className="min-w-0 flex-1 object-cover shadow-[0_0_20px_#808080] max-[849px]:shadow-none"
              src={two}
              alt={altTexts?.[1] ?? imageAltFromPath(two)}
              loading="lazy"
            />
            <img
              className="min-w-0 flex-1 object-cover shadow-[0_0_20px_#808080] max-[849px]:shadow-none"
              src={three}
              alt={altTexts?.[2] ?? imageAltFromPath(three)}
              loading="lazy"
            />
          </div>
          <img
            className="min-h-0 flex-1 object-cover shadow-[0_0_20px_#808080] max-[849px]:shadow-none"
            src={four}
            alt={altTexts?.[3] ?? imageAltFromPath(four)}
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  const [one, two, three] = images;
  return (
    <section className="flex flex-col bg-white px-6 py-12 min-[850px]:px-0 min-[850px]:py-0">
      <div className="mb-2.5">
        <img
          className="block w-full"
          src={one}
          alt={altTexts?.[0] ?? imageAltFromPath(one)}
          loading="lazy"
        />
      </div>
      <div className="flex gap-2.5">
        <img
          className="min-w-0 flex-1"
          src={two}
          alt={altTexts?.[1] ?? imageAltFromPath(two)}
          loading="lazy"
        />
        <img
          className="min-w-0 flex-1"
          src={three}
          alt={altTexts?.[2] ?? imageAltFromPath(three)}
          loading="lazy"
        />
      </div>
    </section>
  );
}
