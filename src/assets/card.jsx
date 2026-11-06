import { Link } from "react-router-dom";

function Card({ post }) {
  return (
    <Link
      className="group block overflow-hidden rounded-lg border border-[#eceeea] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
      to={`/news/${post.id}`}
    >
      <article>
        <div className="h-56 overflow-hidden bg-[#e5e9e5] max-[700px]:h-48">
          <img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src={post.image} alt="" loading="lazy" />
        </div>
        <div className="p-5 max-[700px]:p-4">
          <span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#0e654b]">{post.category}</span>
          <h3 className="my-2 font-serif text-xl leading-snug tracking-tight group-hover:text-[#0e654b] max-[700px]:text-lg">
            {post.title}
          </h3>
          <p className="min-h-9 text-xs leading-relaxed text-[#78817b]">{post.excerpt}</p>
          <div className="mt-4 flex justify-between border-t border-[#f0f1ef] pt-3 text-[10px] text-[#929a95]">
            <span>{post.time}</span>
            <span aria-label={`${post.views} marta ko‘rilgan`}>◉ {post.views}</span>
            <span className="font-semibold text-[#0e654b]">Batafsil o‘qish →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default Card;