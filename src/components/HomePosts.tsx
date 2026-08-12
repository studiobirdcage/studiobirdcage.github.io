type Post = {
  title: string;
  slug: string;
  categorySlug: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  image: string;
};

export default function HomePosts({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-15 flex w-full flex-col justify-around min-[1150px]:flex-row min-[1150px]:gap-5">
      {posts.map((post) => (
        <a
          className="group relative mb-5 w-full bg-white no-underline min-[1150px]:mb-0 min-[1150px]:w-auto min-[1150px]:max-w-none min-[1150px]:flex-1"
          href={`/journal/${post.categorySlug}/${post.slug}`}
          key={post.slug}
        >
          <div className="relative h-75 overflow-hidden bg-[#121212] min-[1150px]:h-[15vw]">
            <span
              aria-hidden="true"
              className="solid-icon absolute top-full left-1/2 z-10 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border-4 border-white text-[56px] text-white opacity-0 shadow-[6px_6px_0_#00fdc7] transition-all duration-200 group-hover:top-1/2 group-hover:opacity-100"
            >
              &#xf120;
            </span>
            <img
              className="h-full w-full object-cover grayscale transition-opacity duration-200 group-hover:opacity-50"
              src={post.image}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="p-[14px_24px] text-left">
            <div className="flex items-end">
              <span className="font-sans-italic text-[22px] text-[#00fdc7] min-[1150px]:text-[28px]">
                Article
              </span>
              <span className="mb-2.5 ml-2.5 h-0.5 flex-1 bg-[#00fdc7]" />
            </div>
            <h3
              className="mt-0 mb-2 leading-none tracking-[-1px] text-[#121212] uppercase transition-colors group-hover:text-[#00fdc7]"
              style={{ fontFamily: '"Neue Plak ExtraBlack", Arial, sans-serif', fontSize: "26px" }}
            >
              {post.title}
            </h3>
            <ul
              className="mb-3 flex list-none p-0 text-[14px]"
              style={{ fontFamily: '"Neue Plak Bold", Arial, sans-serif' }}
            >
              <li className="mr-1.5 bg-[#00fdc7] px-2 py-[0.2em] text-white">
                <span className="regular-icon mr-1.5">&#xf073;</span>
                {post.date}
              </li>
              <li className="bg-[#f4f4f4] px-2 py-[0.2em] text-[#808080]">
                <span className="solid-icon mr-1.5">&#xf2bd;</span>
                {post.author}
              </li>
            </ul>
            <p className="mb-3.5 text-base text-[#808080] italic">{post.excerpt}</p>
            <ul
              className="flex flex-wrap justify-start gap-1.5 p-0 text-[12px] text-[#121212] italic min-[1150px]:justify-end min-[1150px]:text-[14px]"
              style={{ fontFamily: '"Neue Plak Thin Italic", Arial, sans-serif' }}
            >
              {post.tags.map((tag) => (
                <li className="wrap-break-words max-w-full bg-[#f9f8f9] px-2 py-[0.2em]" key={tag}>
                  <span className="solid-icon mr-1.5 text-[#00fdc7]">&#xf02b;</span>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  );
}
