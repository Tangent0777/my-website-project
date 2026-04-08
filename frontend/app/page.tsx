// app/page.tsx
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import BlogCard from '@/components/BlogCard';
import { getAllBlogs } from '@/lib/strapi';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  let latestBlogs: BlogPost[] = [];
  let fetchError = false;

  try {
    const blogs = await getAllBlogs();
    latestBlogs = blogs ? blogs.slice(0, 3) : [];
  } catch (error) {
    console.error('Could not fetch blogs:', error);
    fetchError = true;
    // Don't throw - just continue rendering without blog posts
  }

  return (
    <>
      <Hero />
      <Features />

      {latestBlogs && latestBlogs.length > 0 && (
        <section style={{ padding: '100px 24px', backgroundColor: '#f9f9f9' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '48px',
            }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 900,
                color: '#0a0a0a',
                letterSpacing: '-1px',
              }}>
                Latest Articles
              </h2>
              <Link href="/blog" style={{
                color: '#6c47ff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}>
                View all →
              </Link>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}>
              {latestBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}