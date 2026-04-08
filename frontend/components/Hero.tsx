// components/Hero.tsx
import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px',
      background: 'linear-gradient(180deg, #f8f7ff 0%, #ffffff 100%)',
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
        marginBottom: '32px',
      }}>
        Welcome to MySite
      </span>

      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(48px, 8vw, 88px)',
        fontWeight: 900,
        color: '#0a0a0a',
        lineHeight: 1.05,
        maxWidth: '900px',
        marginBottom: '28px',
        letterSpacing: '-2px',
      }}>
        Build Something{' '}
        <span style={{
          fontStyle: 'italic',
          background: 'linear-gradient(135deg, #6c47ff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Remarkable
        </span>
      </h1>

      <p style={{
        color: '#666',
        fontSize: '20px',
        lineHeight: 1.7,
        maxWidth: '560px',
        marginBottom: '48px',
        fontWeight: 300,
      }}>
        A modern landing page powered by Next.js and Strapi CMS.
        Fast, flexible, and beautiful by default.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/blog" style={{
          backgroundColor: '#111',
          color: '#fff',
          padding: '16px 36px',
          borderRadius: '100px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '0.2px',
        }}>
          Read Our Blog
        </Link>
        <Link href="#features" style={{
          backgroundColor: 'transparent',
          color: '#111',
          padding: '16px 36px',
          borderRadius: '100px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: 600,
          border: '2px solid #e0e0e0',
        }}>
          Learn More
        </Link>
      </div>
    </section>
  );
}