// app/blog/[slug]/page.tsx
import { getBlogBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;  // ← await params
    const post = await getBlogBySlug(slug);
    if (!post) return { title: 'Post Not Found' };
    return {
      title: `${post.title} | MySite Blog`,
      description: post.excerpt,
    };
  } catch {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // ← await params
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const { title, content, publishedAt, category, excerpt, cover } = post;

  const imgUrl = cover?.url
    ? cover.url.startsWith('http')
      ? cover.url
      : `${STRAPI_URL}${cover.url}`
    : null;

  return (
    <article style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px' }}>

      {/* Back link */}
      <Link href="/blog" style={{
        color: '#888',
        textDecoration: 'none',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '48px',
      }}>
        ← Back to Blog
      </Link>

      {/* Category & Date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#6c47ff',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>
          {category}
        </span>
        <span style={{ color: '#ddd' }}>·</span>
        <time style={{ color: '#aaa', fontSize: '14px' }}>
          {new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </time>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(36px, 5vw, 52px)',
        fontWeight: 900,
        color: '#0a0a0a',
        lineHeight: 1.15,
        letterSpacing: '-1px',
        marginBottom: '20px',
      }}>
        {title}
      </h1>

      {/* Excerpt */}
      {excerpt && (
        <p style={{
          fontSize: '20px',
          color: '#666',
          lineHeight: 1.7,
          marginBottom: '48px',
          fontWeight: 300,
        }}>
          {excerpt}
        </p>
      )}

      {/* Cover Image */}
      {imgUrl && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '56px',
        }}>
          <Image
            src={imgUrl}
            alt={cover?.alternativeText || title}
            width={760}
            height={400}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            priority
            unoptimized
          />
        </div>
      )}

      {/* Content */}
      <div style={{
        fontSize: '18px',
        lineHeight: 1.8,
        color: '#333',
      }}>
        <BlocksRenderer content={content} />
      </div>

      {/* Back link bottom */}
      <div style={{ marginTop: '80px', paddingTop: '32px', borderTop: '1px solid #f0f0f0' }}>
        <Link href="/blog" style={{
          color: '#6c47ff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          ← Back to Blog
        </Link>
      </div>

    </article>
  );
}