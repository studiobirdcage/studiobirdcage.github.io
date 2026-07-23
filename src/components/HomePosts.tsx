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
        <a className="group relative mb-5 w-full bg-white no-underline min-[1150px]:mb-0 min-[1150px]:w-auto min-[1150px]:max-w-none min-[1150px]:flex-1" href={`/journal/${post.categorySlug}/${post.slug}`} key={post.slug}>
          <div className="relative h-75 overflow-hidden bg-[#121212] min-[1150px]:h-[15vw]">
            <img className="absolute left-1/2 top-full z-10 w-40 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:top-1/2 group-hover:opacity-100" src="/images/app/single_cage_icon.svg" alt="" />
            <img className="h-full w-full object-cover grayscale transition-opacity duration-200 group-hover:opacity-50" src={post.image} alt="" loading="lazy" />
          </div>
          <div className="p-[14px_24px] text-left">
            <div className="flex items-end"><span className="font-sans-italic text-[22px] text-[#00fdc7] min-[1150px]:text-[28px]">Article</span><span className="mb-2.5 ml-2.5 h-0.5 flex-1 bg-[#00fdc7]" /></div>
            <h3 className="mb-2 mt-0 uppercase leading-none tracking-[-1px] text-[#121212] transition-colors group-hover:text-[#00fdc7]" style={{ fontFamily: '"Neue Plak ExtraBlack", Arial, sans-serif', fontSize: '26px' }}>{post.title}</h3>
            <ul className="mb-3 flex list-none p-0 text-[14px]" style={{ fontFamily: '"Neue Plak Bold", Arial, sans-serif' }}><li className="mr-1.5 bg-[#00fdc7] px-2 py-[0.2em] text-white"><span className="regular-icon mr-1.5">&#xf073;</span>{post.date}</li><li className="bg-[#f4f4f4] px-2 py-[0.2em] text-[#808080]"><span className="solid-icon mr-1.5">&#xf2bd;</span>{post.author}</li></ul>
            <p className="mb-3.5 text-base italic text-[#808080]">{post.excerpt}</p>
            <ul className="flex flex-wrap justify-start gap-1.5 p-0 text-[12px] italic text-[#121212] min-[1150px]:justify-end min-[1150px]:text-[14px]" style={{ fontFamily: '"Neue Plak Thin Italic", Arial, sans-serif' }}>{post.tags.map((tag) => <li className="max-w-full wrap-break-words bg-[#f9f8f9] px-2 py-[0.2em]" key={tag}><span className="solid-icon mr-1.5 text-[#00fdc7]">&#xf02b;</span>{tag}</li>)}</ul>
          </div>
        </a>
      ))}
    </div>
  );
}
