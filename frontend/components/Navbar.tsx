// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #f0f0f0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '26px',
          fontWeight: 900,
          color: '#111',
          textDecoration: 'none',
          letterSpacing: '-0.5px',
        }}>
          MySite
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>Home</Link>
          <Link href="/blog" style={{ color: '#555', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>Blog</Link>
          <Link href="#features" style={{
            backgroundColor: '#111',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}