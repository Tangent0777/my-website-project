"use client";
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export default function BlogCard({ post }: { post: BlogPost }) {
  const title    = post.title    || 'Untitled';
  const slug     = post.slug     || '';
  const excerpt  = post.excerpt  || '';
  const category = post.category || 'General';
  const publishedAt = post.publishedAt || new Date().toISOString();
  const cover    = post.cover    || null;

  const imgUrl = cover?.url
    ? cover.url.startsWith('http')
      ? cover.url
      : `${STRAPI_URL}${cover.url}`
    : null;

  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #f0f0f0',
          backgroundColor: '#fff',
          transition: 'transform 0.25s, box-shadow 0.25s',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Cover Image */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          background: 'linear-gradient(135deg, #f0eeff 0%, #fce7ff 100%)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={title}
              width={400}
              height={220}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              unoptimized
            />
          ) : (
            <span style={{ fontSize: '48px', opacity: 0.25 }}>📝</span>
          )}
        </div>

        {/* Card Body */}
        <div style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
          {/* Category */}
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#6c47ff',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '12px',
            display: 'block',
          }}>
            {category}
          </span>

          {/* Title */}
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '20px',
            fontWeight: 700,
            color: '#111',
            lineHeight: 1.4,
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {title}
          </h3>

          {/* Excerpt */}
          <p style={{
            color: '#888',
            fontSize: '14px',
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
            marginBottom: '20px',
          }}>
            {excerpt}
          </p>

          {/* Date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #f5f5f5',
            paddingTop: '16px',
            marginTop: 'auto',
          }}>
            <p style={{ fontSize: '12px', color: '#bbb', fontWeight: 500 }}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
            <span style={{
              fontSize: '12px',
              color: '#6c47ff',
              fontWeight: 600,
            }}>
              Read →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}