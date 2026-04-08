// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      color: '#888',
      padding: '64px 24px',
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '32px',
      }}>
        <div>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            color: '#fff',
            fontSize: '24px',
            fontWeight: 900,
            marginBottom: '8px',
          }}>MySite</p>
          <p style={{ fontSize: '14px' }}>Built with Next.js & Strapi CMS</p>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Home', 'Blog', 'Features'].map((item) => (
            <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={{
              color: '#888',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
            }}>
              {item}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: '13px' }}>
          © {new Date().getFullYear()} MySite. All rights reserved.
        </p>
      </div>
    </footer>
  );
}