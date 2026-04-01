export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author?: string;
  date: string;
  publishedAt?: string;
  markdown: string;
};

const markdownFiles = import.meta.glob("../blog-posts/*.md", {
  query: "?raw",
  import: "default",
});

function parseFrontmatter(markdown: string): { data: Record<string, string | number>; content: string } {
  const match = markdown.match(/^---([\s\S]*?)---\s*/);
  if (!match) {
    return { data: {}, content: markdown.trim() };
  }

  const yaml = match[1];
  const data: Record<string, string | number> = {};

  yaml.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx < 0) return;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (!key) return;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    const asNumber = Number(value);
    data[key] = Number.isNaN(asNumber) ? value : asNumber;
  });

  return { data, content: markdown.slice(match[0].length).trim() };
}

function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toPost(raw: string): BlogPostMeta {
  const { data, content } = parseFrontmatter(raw);
  const publishedAt = typeof data.publishedAt === "string" ? data.publishedAt : undefined;
  const readTimeValue = typeof data.readingTime === "number" ? `${data.readingTime} min` : "";

  return {
    slug: String(data.slug ?? ""),
    title: String(data.title ?? "Sem titulo"),
    excerpt: String(data.excerpt ?? `${content.slice(0, 180)}...`),
    category: String(data.category ?? "Geral"),
    readTime: readTimeValue,
    image: String(data.coverImage ?? ""),
    author: typeof data.author === "string" ? data.author : undefined,
    date: formatDate(publishedAt),
    publishedAt,
    markdown: content,
  };
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const entries = await Promise.all(
    Object.values(markdownFiles).map(async (loader) => {
      const raw = await loader();
      return toPost(raw as string);
    }),
  );

  return entries
    .filter((post) => post.slug)
    .sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostMeta | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
