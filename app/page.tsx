import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import { siteConfig } from "@/site.config";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function Home() {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-16">
      <section className="mb-14">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
          {siteConfig.tagline}
        </h1>
        <p className="text-[color:var(--muted)] text-base md:text-lg leading-relaxed">
          {siteConfig.description}
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">오늘의 이야기</h2>
          <span className="text-sm text-[color:var(--muted)]">
            전체 {posts.length}편
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--card)] p-8 text-center text-[color:var(--muted)]">
            아직 올라온 글이 없어요. 곧 첫 글이 올라옵니다.
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 md:p-6 hover:border-[color:var(--accent)] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 text-xs md:text-sm text-[color:var(--muted)] mb-2">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold leading-snug mb-2 text-[color:var(--foreground)]">
                    {post.title}
                  </h3>
                  <p className="text-sm md:text-base text-[color:var(--muted)] leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
