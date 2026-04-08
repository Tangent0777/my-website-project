// types/blog.ts
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: any[];
  category: string;
  publishedAt: string;
  cover: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  } | null;
}