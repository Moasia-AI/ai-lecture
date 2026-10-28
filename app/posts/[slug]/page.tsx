import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import type { Metadata } from "next";

export const runtime = "nodejs";
export const dynamicParams = true;

export async function generateMetadata(
  props: PageProps<"/posts/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default async function PostPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 md:py-16">
      <Link
        href="/"
        className="inline-block text-sm text-[color:var(--muted)] hover:text-[color:var(--accent)] mb-6"
      >
        ← 전체 글 목록으로
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[color:var(--muted)] mb-3">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
          {post.title}
        </h1>
        {post.summary && (
          <p className="text-base md:text-lg text-[color:var(--muted)] leading-relaxed">
            {post.summary}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
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
      </header>

      <div
        className="prose-reader"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="mt-16 pt-8 border-t border-[color:var(--border)]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[color:var(--accent)] font-medium hover:underline"
        >
          ← 다른 글도 읽어보기
        </Link>
      </footer>
    </article>
  );
}
