type Work = {
  title: string;
  slug: string;
  tags: string[];
  image: string;
};

export default function FeaturedSlider({ works }: { works: Work[] }) {
  return (
    <section className="flex w-full flex-wrap bg-[#f4f4f4] p-5 min-[850px]:h-[calc(100vh-80px)] min-[850px]:min-h-160 min-[850px]:flex-nowrap min-[850px]:p-0">
      {works.map((work) => (
        <a
          className="group relative mb-5 h-105 w-full flex-[2_1_auto] overflow-hidden bg-[#f4f4f4] shadow-[0_0_20px_#808080] transition-[flex] duration-200 min-[850px]:mb-0 min-[850px]:h-full min-[850px]:min-h-full min-[850px]:w-auto min-[850px]:flex-1 min-[850px]:shadow-none min-[850px]:hover:flex-4"
          href={`/works/${work.slug}`}
          key={work.slug}
        >
          <img
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-80 min-[850px]:group-hover:opacity-0"
            src={work.image}
            alt=""
          />
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-center bg-[#f4f4f4] px-5 py-5 text-center min-[850px]:top-1/2 min-[850px]:left-1/2 min-[850px]:w-105 min-[850px]:-translate-x-1/2 min-[850px]:-translate-y-1/2 min-[850px]:bg-transparent min-[850px]:px-0 min-[850px]:py-0 min-[850px]:opacity-0 min-[850px]:transition-opacity min-[850px]:group-hover:opacity-100">
            <span
              aria-hidden="true"
              className="solid-icon mb-2 grid size-12 place-items-center rounded-lg border-2 border-[#121212] bg-white text-xl text-[#121212] shadow-[3px_3px_0_#00fdc7] min-[850px]:mb-6 min-[850px]:size-24 min-[850px]:rounded-xl min-[850px]:border-4 min-[850px]:text-[42px] min-[850px]:shadow-[6px_6px_0_#00fdc7]"
            >
              &#xf120;
            </span>
            <h2 className="font-display-italic text-[clamp(12px,6vw,24px)] leading-none tracking-[-1px] text-[#121212] min-[850px]:text-[34px] min-[850px]:leading-[1.2]">
              {work.title}
            </h2>
            <span className="my-1.5 h-0.5 w-16.25 bg-[#00fdc7] min-[850px]:my-3 min-[850px]:mb-4.5 min-[850px]:w-1/2" />
            <ul className="font-book flex flex-wrap justify-center text-[clamp(8px,3vw,12px)] leading-none tracking-[clamp(1px,0.8vw,3px)] text-[#121212] uppercase min-[850px]:text-base min-[850px]:tracking-[4px] min-[850px]:text-[#808080]">
              {work.tags.map((tag, index) => (
                <li key={tag}>
                  {tag}
                  {index < work.tags.length - 1 && <span className="px-2">•</span>}
                </li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </section>
  );
}
