type ProjectParagraphProps = {
  title: string;
  text: string;
};

export default function ProjectParagraph({ title, text }: ProjectParagraphProps) {
  return <section className="px-6 py-12 text-center min-[850px]:px-40 min-[850px]:py-30"><h3 className="with-line max-[849px]:text-[30px]"><span className="relative right-3 top-3 min-[850px]:top-5">{title}</span></h3><p className="mt-8 whitespace-pre-line font-sans-italic text-[18px] leading-[1.8] tracking-[1px] text-[#808080] min-[850px]:mt-20 min-[850px]:text-[26px] min-[850px]:leading-[2] min-[850px]:tracking-[2px]">{text}</p></section>;
}
