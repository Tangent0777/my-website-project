// app/blog/page.tsx
import { getAllBlogs } from '@/lib/strapi';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/types/blog';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog | MySite',
  description: 'Read our latest articles and stories.',
};

export default async function BlogPage() {
  let blogs: BlogPost[] = [];

  try {
    blogs = (await getAllBlogs()) as BlogPost[];
  } catch (error) {
    console.error('Could not fetch blogs:', error);
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(180deg, #f8f7ff 0%, #ffffff 100%)',
        padding: '80px 24px 64px',
        textAlign: 'center',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <span style={{
          display: 'inline-block',
          backgroundColor: '#f0eeff',
          color: '#6c47ff',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          padding: '8px 20px',
          borderRadius: '100px',
          marginBottom: '24px',
        }}>
          Our Blog
        </span>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(42px, 6vw, 72px)',
          fontWeight: 900,
          color: '#0a0a0a',
          lineHeight: 1.1,
          letterSpacing: '-2px',
          marginBottom: '20px',
        }}>
          Thoughts & Stories
        </h1>

        <p style={{
          color: '#888',
          fontSize: '18px',
          lineHeight: 1.7,
          maxWidth: '480px',
          margin: '0 auto',
          fontWeight: 300,
        }}>
          Ideas, tutorials, and insights worth sharing with the world.
        </p>
      </div>

      {/* Blog Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 24px 100px',
      }}>
        {blogs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
          }}>
            <span style={{ fontSize: '64px', display: 'block', marginBottom: '24px' }}>📭</span>
            <p style={{ color: '#aaa', fontSize: '18px' }}>No posts published yet.</p>
          </div>
        ) : (
          <>
            {/* Post count */}
            <p style={{
              color: '#aaa',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '40px',
              letterSpacing: '0.5px',
            }}>
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} published
            </p>

            {/* Responsive Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
              className="blog-grid"
            >
              {blogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}