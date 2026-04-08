// lib/strapi.ts

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// ── Types ────────────────────────────────────────────────────────────────────

export interface StrapiCover {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any[];
  category: string;
  publishedAt: string;
  cover: StrapiCover | null;
}

// ── Fetch helper ─────────────────────────────────────────────────────────────

async function fetchStrapi(endpoint: string) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  console.log('Fetching:', url);

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Strapi error:', errorText);
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── Normaliser ────────────────────────────────────────────────────────────────
// Handles both Strapi v4 (.attributes wrapper) and v5 (flat structure)

function normalise(raw: any): BlogPost {
  const fields = raw.attributes ?? raw;

  // Handle cover image - could be nested in data.attributes or direct
  let coverData = fields.cover;
  if (coverData?.data?.attributes) {
    coverData = coverData.data.attributes;
  } else if (coverData?.data) {
    coverData = coverData.data;
  }

  // Build full absolute URL so components don't have to
  const coverUrl = coverData?.url
    ? coverData.url.startsWith('http')
      ? coverData.url
      : `${STRAPI_URL}${coverData.url}`
    : null;

  return {
    id:          raw.id,
    documentId:  raw.documentId ?? '',
    title:       fields.title       ?? 'Untitled',
    slug:        fields.slug        ?? '',
    excerpt:     fields.excerpt     ?? '',
    content:     (fields.content    ?? []) as any[],
    category:    fields.category    ?? 'General',
    publishedAt: fields.publishedAt ?? new Date().toISOString(),
    cover: coverUrl
      ? {
          url:             coverUrl,
          alternativeText: coverData?.alternativeText ?? '',
        }
      : null,
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getAllBlogs(): Promise<BlogPost[]> {
  const data = await fetchStrapi('/blogs?populate=cover&sort=publishedAt:desc');
  return (data.data as any[]).map(normalise);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const data = await fetchStrapi(
    `/blogs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=cover`
  );
  if (!data.data?.length) return null;
  return normalise(data.data[0]);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const data = await fetchStrapi('/blogs?fields[0]=slug');
  return (data.data as any[])
    .map((post) => post.attributes?.slug ?? post.slug ?? '')
    .filter(Boolean);
}