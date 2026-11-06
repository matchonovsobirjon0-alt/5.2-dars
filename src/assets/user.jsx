import { useEffect, useState } from "react";

function User() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/dummy.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Foydalanuvchilarni yuklab bo‘lmadi.");
        }
        return response.json();
      })
      .then((data) => {
        if (active) setUsers(data.users);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-lg border border-[#e9ece7] bg-white p-5 max-[700px]:p-4" aria-labelledby="authors-title">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#0e654b]">Jamoamiz</span>
          <h2 className="mt-1.5 font-serif text-xl tracking-tight" id="authors-title">Mualliflar</h2>
        </div>
        <span className="grid size-7 place-items-center rounded-full bg-[#eff5f1] text-sm text-[#0e654b]" aria-hidden="true">→</span>
      </div>
      {error ? (
        <p className="mt-4 text-[11px] text-red-700" role="alert">{error}</p>
      ) : users.length === 0 ? (
        <p className="mt-4 text-[11px] text-[#7d8780]">Mualliflar yuklanmoqda…</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3.5">
          {users.map((user) => (
            <article className="flex items-center gap-2.5" key={user.id}>
              <img className="size-10 rounded-full bg-[#e9eeea] object-cover" src={user.avatar} alt="" loading="lazy" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[11px] font-bold">{user.name}</h3>
                <p className="mt-1 text-[9px] text-[#858e88]">{user.role}</p>
              </div>
              <span className="text-[13px] text-[#93a098]" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default User;