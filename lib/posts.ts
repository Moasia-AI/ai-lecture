import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readingTime: string;
  tags?: string[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

function getFileNames(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"));
}

function estimateReadingTime(text: string): string {
  const koreanCharCount = (text.match(/[가-힯]/g) || []).length;
  const otherWordCount = text.replace(/[가-힯]/g, "").trim().split(/\s+/)
    .length;
  const minutes = Math.max(
    1,
    Math.round(koreanCharCount / 500 + otherWordCount / 220)
  );
  return `${minutes}분 읽기`;
}

function parseFile(fileName: string) {
  const slug = fileName.replace(/\.(md|mdx)$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const data = matter(fileContents);
  return { data, slug };
}

export function getAllPostsMeta(): PostMeta[] {
  const files = getFileNames();
  const posts = files.map((fileName) => {
    const { data, slug } = parseFile(fileName);
    const front = data.data as {
      title?: string;
      date?: string;
      summary?: string;
      tags?: string[];
    };
    return {
      slug,
      title: front.title ?? slug,
      date: front.date ?? "",
      summary: front.summary ?? data.content.slice(0, 120).replace(/\n/g, " "),
      readingTime: estimateReadingTime(data.content),
      tags: front.tags ?? [],
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const files = getFileNames();
  const match = files.find((name) => name.replace(/\.(md|mdx)$/, "") === slug);
  if (!match) return null;

  const { data } = parseFile(match);
  const front = data.data as {
    title?: string;
    date?: string;
    summary?: string;
    tags?: string[];
  };

  const processed = await remark().use(html).process(data.content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: front.title ?? slug,
    date: front.date ?? "",
    summary: front.summary ?? "",
    readingTime: estimateReadingTime(data.content),
    tags: front.tags ?? [],
    contentHtml,
  };
}

export function getAllSlugs(): string[] {
  return getFileNames().map((name) => name.replace(/\.(md|mdx)$/, ""));
}
