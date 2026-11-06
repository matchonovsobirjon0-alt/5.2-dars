import { Link, useParams } from "react-router-dom";
import { categories, posts } from "./posts.jsx";

function Article() {
  const { id } = useParams();
  const post = posts.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f6f3] px-5 text-center text-[#17211d]">
        <div>
          <h1 className="font-serif text-3xl">Maqola topilmadi</h1>
          <Link className="mt-4 inline-block text-sm font-semibold text-[#0e654b]" to="/">Bosh sahifaga qaytish →</Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f3] text-[#17211d]">
      <header className="border-b border-[#e7e9e5] bg-white">
        <div className="mx-auto flex min-h-20 w-[min(1200px,calc(100%-48px))] items-center justify-between gap-5 max-[700px]:w-[min(100%-32px,560px)]">
          <Link className="inline-flex items-center gap-2.25" to="/" aria-label="Xabar bosh sahifa">
            <span className="grid size-9.75 place-items-center rounded-[12px_12px_12px_3px] bg-[#0e654b] text-[22px] font-extrabold text-white">X</span>
            <span className="text-[25px] font-extrabold tracking-[-.08em]">xabar<span className="text-[#0e654b]">.uz</span></span>
          </Link>
          <nav className="flex items-center gap-6 overflow-x-auto text-xs text-[#53605a] max-[700px]:gap-4" aria-label="Yangiliklar bo‘limlari">
            {categories.slice(1).map((category) => (
              <Link className="shrink-0 hover:text-[#0e654b]" to={`/category/${encodeURIComponent(category)}`} key={category}>{category}</Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-[min(900px,calc(100%-48px))] py-10 max-[700px]:w-[min(100%-32px,560px)] max-[700px]:py-6">
        <Link className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0e654b]" to={`/category/${encodeURIComponent(post.category)}`}>
          ← {post.category} yangiliklariga qaytish
        </Link>
        <article className="overflow-hidden rounded-xl border border-[#e9ece7] bg-white">
          <div className="px-8 pb-7 pt-9 max-[700px]:px-5 max-[700px]:pt-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#78817c]">
              <span className="rounded-full bg-[#eff5f1] px-3 py-1.5 font-bold uppercase tracking-wider text-[#0e654b]">{post.category}</span>
              <span>Bugun, {post.time}</span>
              <span>◉ {post.views} marta o‘qildi</span>
            </div>
            <h1 className="mt-5 max-w-195 font-serif text-4xl font-bold leading-tight tracking-tight max-[700px]:text-3xl">{post.title}</h1>
            <p className="mt-4 max-w-190 text-lg leading-relaxed text-[#68736c] max-[700px]:text-base">{post.excerpt}</p>
          </div>
          <img className="max-h-130 w-full bg-[#e5e9e5] object-cover" src={post.image} alt={post.title} />
          <div className="mx-auto max-w-180 px-8 py-9 max-[700px]:px-5 max-[700px]:py-6">
            <div className="mb-6 border-l-2 border-[#0e654b] pl-4 text-sm text-[#78817c]">
              Xabar.uz — O‘zbekiston va dunyo yangiliklari
            </div>
            <div className="space-y-5 font-serif text-lg leading-[1.9] text-[#303b35] max-[700px]:text-base">
              {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-9 border-t border-[#e9ece7] pt-5">
              <Link className="font-sans text-sm font-semibold text-[#0e654b]" to="/">← Bosh sahifaga qaytish</Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default Article;
