type Post = {
  title: string;
  slug: string;
  categorySlug: string;
  category: string;
  date: string;
  excerpt: string;
  tags?: string[];
  image: string;
};

function PostCard({ post, featured }: { post: Post; featured: boolean }) {
  const href = `/journal/${post.categorySlug}/${post.slug}`;
  return (
    <article data-post-category={post.categorySlug} className="relative bg-white">
      <a className={`group relative block overflow-hidden bg-[#121212] ${featured ? "h-125" : "h-100"}`} href={href}>
        <img className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-50" src={post.image} alt="" loading="lazy" />
        <img className="absolute left-1/2 top-full w-40 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:top-[42%] group-hover:opacity-100" src="/images/app/single_cage_icon.svg" alt="" />
      </a>
      <div className={`relative z-10 mx-auto -mt-20 w-[85%] bg-[#f9f8f9] px-8 py-10 text-center shadow-[0_0_35px_rgba(0,0,0,.15)] ${featured ? "md:px-30" : "md:px-16"}`}>
        <ul className={`mb-3.5 flex list-none justify-center p-0 font-bold uppercase tracking-[-.5px] ${featured ? "text-lg max-[1149px]:text-sm max-[500px]:text-xs" : "text-sm max-[500px]:text-xs"}`}><li className="mr-1 bg-[#cdcccf] px-3 py-1.5 text-white max-[500px]:px-2 max-[500px]:py-1"><a href={`/journal?category=${post.categorySlug}`}><span className="solid-icon mr-1.5">&#xf07c;</span>{post.category}</a></li><li className="bg-[#00fdc7] px-3 py-1.5 text-white max-[500px]:px-2 max-[500px]:py-1"><span className="regular-icon mr-1.5">&#xf073;</span>{post.date}</li></ul>
        <h2 className={`font-black uppercase leading-none tracking-[-1px] text-[#121212] transition hover:text-[#00fdc7] ${featured ? "text-[44px] max-[1149px]:text-[32px] max-[500px]:text-[28px]" : "text-[32px] max-[500px]:text-[28px]"}`}><a href={href}>{post.title}</a></h2>
        <span className="mx-auto my-6 block h-0.5 w-1/5 bg-[#00fdc7]" />
        <p className={`font-sans tracking-[1px] text-[#808080] ${featured ? "text-lg max-[500px]:text-base" : "text-base"}`}>{post.excerpt}</p>
        {!!post.tags?.length && <ul className={`mt-5 flex list-none flex-wrap justify-center gap-1 p-0 ${featured ? "text-sm" : "text-xs"}`}>{post.tags.map((tag) => <li className="bg-[#cdcccf] px-2 py-1 font-bold italic text-white"><span className="solid-icon mr-1.5">&#xf02b;</span>{tag}</li>)}</ul>}
      </div>
    </article>
  );
}

export default function PostsGrid({ posts }: { posts: Post[] }) {
  // First 2 posts are full-width (matching Laravel's first-chunk fullpost behavior)
  const fullPosts = posts.slice(0, 2);
  const restPosts = posts.slice(2);
  // Pair up remaining posts for duo containers
  const pairs = restPosts.reduce<Post[][]>((groups, post, index) => {
    if (index % 2 === 0) groups.push([post]);
    else groups.at(-1)?.push(post);
    return groups;
  }, []);

  return (
    <div className="blog-roll flex flex-col gap-20">
      {/* Two full-width posts */}
      {fullPosts.map((post) => (
        <PostCard post={post} featured key={post.slug} />
      ))}
      {/* Remaining posts in flex-row duo containers */}
      {pairs.map((pair) => (
        <div
          className="duo-blog-container flex flex-col gap-20 bg-white min-[1150px]:flex-row min-[1150px]:gap-0"
          key={pair.map(({ slug }) => slug).join("-")}
        >
          {pair.map((post) => (
            <PostCard post={post} featured={false} key={post.slug} />
          ))}
        </div>
      ))}
    </div>
  );
}
