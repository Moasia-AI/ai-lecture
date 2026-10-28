import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR } from "next/font/google";
import { siteConfig } from "@/site.config";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans-korean",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[color:var(--border)] bg-[color:var(--card)]">
          <div className="mx-auto max-w-3xl px-5 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
                {siteConfig.name}
              </span>
            </Link>
            <a
              href={siteConfig.parentSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              {siteConfig.parentSite.name} →
            </a>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[color:var(--border)] mt-16">
          <div className="mx-auto max-w-3xl px-5 py-8 text-sm text-[color:var(--muted)]">
            <p className="mb-1">© {new Date().getFullYear()} {siteConfig.author}</p>
            <p>{siteConfig.tagline}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
