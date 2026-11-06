import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "./card.jsx";
import { categories, posts, trendingNews } from "./posts.jsx";
import User from "./user.jsx";

function categoryUrl(category) {
  return `/category/${encodeURIComponent(category)}`;
}

function Home() {
  const { category: routeCategory } = useParams();
  const activeCategory = routeCategory || "Barchasi";
  const isHomePage = !routeCategory;
  const [search, setSearch] = useState("");

  const visiblePosts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("uz");
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "Barchasi" || post.category === activeCategory;
      const matchesSearch =
        !query ||
        `${post.title} ${post.excerpt} ${post.category}`
          .toLocaleLowerCase("uz")
          .includes(query);
      return (
        matchesCategory &&
        matchesSearch &&
        (activeCategory !== "Barchasi" || !post.featured)
      );
    });
  }, [activeCategory, search]);

  const featuredPost = posts.find((post) => post.featured);

  return (
    <div className="min-h-screen bg-[#f5f6f3] text-[#17211d]">
      <div className="bg-[#10251e] text-[11px] tracking-wide text-[#c9d6d0]">
        <div className="mx-auto flex h-8.5 w-[min(1200px,calc(100%-48px))] items-center justify-between max-[700px]:w-[min(100%-32px,560px)]">
          <span>Yangiliklar markazi</span>
          <span>Juma, 6-noyabr 2026</span>
          <a className="text-white" href="#mualliflar">Biz haqimizda</a>
        </div>
      </div>

      <header className="bg-white">
        <div className="mx-auto flex h-22.5 w-[min(1200px,calc(100%-48px))] items-center gap-7.5 max-[900px]:gap-4.25 max-[700px]:h-auto max-[700px]:min-h-18 max-[700px]:w-[min(100%-32px,560px)] max-[700px]:flex-wrap max-[700px]:gap-3 max-[700px]:py-3.25">
          <Link className="inline-flex shrink-0 items-center gap-2.25" to="/" aria-label="Xabar bosh sahifa">
            <span className="grid size-9.75 place-items-center rounded-[12px_12px_12px_3px] bg-[#0e654b] text-[22px] font-extrabold text-white max-[700px]:size-8.75">X</span>
            <span className="text-[25px] font-extrabold tracking-[-.08em] max-[700px]:text-[22px]">xabar<span className="text-[#0e654b]">.uz</span></span>
          </Link>
          <p className="text-[11px] leading-relaxed text-[#78817c] max-[900px]:hidden">O‘zbekiston va dunyo<br />yangiliklari</p>
          <label className="ml-auto flex h-10.75 w-[min(430px,42vw)] items-center gap-2.5 rounded-md border border-[#e7e9e5] px-3 text-[#88918c] max-[700px]:order-3 max-[700px]:ml-0 max-[700px]:h-9.75 max-[700px]:w-full">
            <span className="text-[23px] leading-none" aria-hidden="true">⌕</span>
            <input
              className="w-full bg-transparent text-xs text-[#202b26] outline-none placeholder:text-[#88918c]"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Yangiliklardan qidirish"
              aria-label="Yangiliklardan qidirish"
            />
            <kbd className="shrink-0 rounded border border-[#e7e9e5] px-1.5 py-1 text-[10px] max-[700px]:hidden">⌘ K</kbd>
          </label>
          <button className="h-10.75 shrink-0 rounded-md bg-[#0e654b] px-4 text-xs font-semibold text-white max-[700px]:ml-auto max-[700px]:h-9 max-[700px]:px-3 max-[700px]:text-[10px]" type="button">
            Obuna bo‘lish <span className="ml-2">↗</span>
          </button>
        </div>
        <nav className="border-y border-[#e7e9e5]" aria-label="Asosiy bo‘limlar">
          <div className="mx-auto flex h-11.75 w-[min(1200px,calc(100%-48px))] items-center gap-7.75 overflow-x-auto whitespace-nowrap scrollbar-none max-[700px]:h-10.75 max-[700px]:w-[min(100%-32px,560px)] max-[700px]:gap-5.75">
            <Link className={`shrink-0 text-xs ${activeCategory === "Barchasi" ? "font-bold text-[#0e654b]" : "text-[#53605a]"}`} to="/">Asosiy</Link>
            {categories.slice(1).map((category) => (
              <Link
                className={`shrink-0 text-xs ${activeCategory === category ? "font-bold text-[#0e654b]" : "text-[#53605a]"}`}
                to={categoryUrl(category)}
                key={category}
              >
                {category}
              </Link>
            ))}
            <a className="shrink-0 text-xs text-[#53605a]" href="#mualliflar">Mualliflar</a>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-[min(1200px,calc(100%-48px))] pt-7.5 max-[700px]:w-[min(100%-32px,560px)] max-[700px]:pt-4.5">
        {isHomePage && (
          <>
            <section className="grid min-h-89.5 grid-cols-[1fr_1.03fr] overflow-hidden rounded-lg bg-white max-[900px]:min-h-82.5 max-[700px]:grid-cols-1" aria-labelledby="hero-title">
              <div className="flex flex-col items-start p-[35px_38px_28px] max-[900px]:p-7 max-[700px]:min-h-73.75 max-[700px]:p-6">
                <span className="mb-6 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-[#d34b3f]">
                  <span className="size-1.75 rounded-full bg-[#dd5147] shadow-[0_0_0_4px_#fbecea]" /> SO‘NGGI YANGILIKLAR
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#0e654b]">
                  {featuredPost.category} <span className="px-1 text-[#b7c0ba]">·</span> Bugun, {featuredPost.time}
                </span>
                <h1 className="my-3 max-w-125 font-serif text-[clamp(26px,3vw,37px)] font-bold leading-[1.18] tracking-[-.035em] max-[700px]:text-[29px]" id="hero-title">{featuredPost.title}</h1>
                <p className="max-w-110 text-[13px] leading-[1.7] text-[#758079]">{featuredPost.excerpt}</p>
                <a className="mt-5.5 inline-flex items-center gap-4.25 text-xs font-bold text-[#0e654b]" href="#yangiliklar">Batafsil o‘qish <span className="text-[17px]">→</span></a>
                <div className="mt-auto flex items-center gap-2.25 pt-4.25 text-[10px] text-[#a4aca7]"><strong className="text-[13px] text-[#0e654b]">01</strong><span className="h-0.5 w-11.5 bg-[#e8ebe7]" /> 06</div>
              </div>
              <div className="relative min-h-89.5 overflow-hidden bg-[#dce5df] max-[900px]:min-h-82.5 max-[700px]:min-h-60">
                <img src={featuredPost.image} alt="" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 top-[45%] bg-linear-to-b from-transparent to-[rgba(6,27,19,.45)]" />
                <span className="absolute bottom-4.25 right-5 z-10 text-[11px] text-white">Kun mavzusi</span>
              </div>
            </section>

            <section className="my-4.25 flex min-h-13 items-center gap-3.75 rounded-md border border-[#e8ebe6] bg-white px-4.25 max-[700px]:my-3.25 max-[700px]:gap-2.25 max-[700px]:px-2.5" aria-label="Tezkor xabar">
              <span className="rounded-sm bg-[#d74c40] px-2 py-1.5 text-[9px] font-extrabold tracking-wider text-white">TEZKOR</span>
              <p className="flex-1 text-xs text-[#48554e] max-[700px]:text-[10px]">Kun davomida sodir bo‘layotgan muhim voqealarni biz bilan kuzatib boring</p>
              <span className="text-[10px] text-[#89928c] max-[700px]:hidden">12:45</span>
            </section>
          </>
        )}

        <div className="grid scroll-mt-4.5 grid-cols-[minmax(0,1fr)_300px] items-start gap-9.5 max-[900px]:grid-cols-[minmax(0,1fr)_260px] max-[900px]:gap-5.5 max-[700px]:grid-cols-1 max-[700px]:gap-6.5" id="yangiliklar">
          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#0e654b]">Eng so‘nggi xabarlar</span>
                <h2 className="mt-1.75 font-serif text-[25px] tracking-tight max-[700px]:text-[22px]">
                  {activeCategory === "Barchasi" ? "So‘nggi yangiliklar" : activeCategory}
                </h2>
              </div>
              <Link className="inline-flex items-center gap-2 pb-0.75 text-[11px] font-bold text-[#0e654b]" to="/">Barchasi <span className="text-[17px]">→</span></Link>
            </div>
            <div className="my-5 flex gap-2 overflow-x-auto pb-0.75 scrollbar-none" aria-label="Yangiliklar kategoriyasi">
              {categories.map((category) => (
                <Link
                  className={`shrink-0 rounded border px-3 py-2 text-[10px] transition ${activeCategory === category ? "border-[#0e654b] bg-[#0e654b] text-white" : "border-[#e3e7e2] bg-white text-[#6f7973] hover:border-[#0e654b] hover:text-[#0e654b]"}`}
                  to={category === "Barchasi" ? "/" : categoryUrl(category)}
                  key={category}
                  aria-current={activeCategory === category ? "page" : undefined}
                >
                  {category}
                </Link>
              ))}
            </div>
            {visiblePosts.length ? (
              <div className={`grid gap-4.25 max-[700px]:gap-3 ${visiblePosts.length === 1 ? "grid-cols-1" : "grid-cols-2 max-[430px]:grid-cols-1"}`}>
                {visiblePosts.map((post) => <Card key={post.id} post={post} />)}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-[#dce2dc] bg-white px-5 py-11 text-center">
                <span className="text-[28px] text-[#0e654b]">⌕</span>
                <h3 className="my-2 font-serif text-lg">Yangilik topilmadi</h3>
                <p className="text-xs text-[#78817c]">Boshqa so‘z bilan qidirib ko‘ring yoki bo‘limni o‘zgartiring.</p>
              </div>
            )}
          </section>

          <aside className="flex flex-col gap-6 max-[700px]:grid max-[700px]:grid-cols-2 max-[700px]:items-start max-[700px]:gap-3.5 max-[430px]:grid-cols-1">
            <section className="rounded-lg border border-[#e9ece7] bg-white p-5 max-[700px]:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#0e654b]">Ko‘p o‘qilgan</span>
                  <h2 className="mt-1.5 font-serif text-xl tracking-tight">Kun mavzulari</h2>
                </div>
                <span className="grid size-7 place-items-center rounded-full bg-[#eff5f1] text-sm text-[#0e654b]" aria-hidden="true">↗</span>
              </div>
              <ol className="mt-3">
                {trendingNews.map((title, index) => (
                  <li className="grid grid-cols-[28px_1fr] gap-2.25 border-b border-[#eff0ee] py-3.25 last:border-0 last:pb-0" key={title}>
                    <span className="font-serif text-sm text-[#afbbb4]">0{index + 1}</span>
                    <a className="font-serif text-[13px] font-semibold leading-snug hover:text-[#0e654b]" href="#yangiliklar">{title}</a>
                  </li>
                ))}
              </ol>
            </section>
            <div id="mualliflar"><User /></div>
            <section className="rounded-lg bg-[#084b39] p-5 text-white max-[700px]:h-full max-[700px]:p-4">
              <span className="text-[21px] text-[#a7d8be]">✳</span>
              <h2 className="my-2 max-w-55 font-serif text-xl leading-tight">Yangiliklardan xabardor bo‘ling</h2>
              <p className="text-[10px] leading-relaxed text-[#c4d5cc]">Eng muhim xabarlar to‘plami — har kuni pochta qutingizda.</p>
              <form className="my-4 flex h-9.5 rounded bg-white p-0.75" onSubmit={(event) => event.preventDefault()}>
                <input className="min-w-0 flex-1 px-2 text-[10px] text-[#26332c] outline-none" type="email" placeholder="Email manzilingiz" aria-label="Email manzilingiz" />
                <button className="w-8.5 shrink-0 rounded-sm bg-[#0e654b] text-[17px] text-white" type="submit" aria-label="Obuna bo‘lish">→</button>
              </form>
              <small className="text-[8px] text-[#9fb8aa]">Spam yo‘q. Istalgan vaqtda obunani bekor qiling.</small>
            </section>
          </aside>
        </div>
      </main>

      <footer className="mt-15 border-t border-[#e5e9e4] bg-white">
        <div className="mx-auto flex min-h-20.5 w-[min(1200px,calc(100%-48px))] items-center justify-between gap-5 max-[700px]:w-[min(100%-32px,560px)] max-[700px]:flex-wrap max-[700px]:justify-center max-[700px]:py-4.5">
          <Link className="inline-flex items-center gap-2.25" to="/">
            <span className="grid size-7.5 place-items-center rounded-[9px_9px_9px_2px] bg-[#0e654b] text-[17px] font-extrabold text-white">X</span>
            <span className="text-xl font-extrabold tracking-[-.08em]">xabar<span className="text-[#0e654b]">.uz</span></span>
          </Link>
          <p className="text-[10px] text-[#849088] max-[700px]:order-3 max-[700px]:w-full max-[700px]:text-center">© 2026 Xabar. Barcha huquqlar himoyalangan.</p>
          <a className="text-[10px] text-[#0e654b]" href="#yangiliklar">Yuqoriga ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
