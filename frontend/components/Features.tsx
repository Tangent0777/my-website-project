// components/Features.tsx
const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Built with Next.js App Router for maximum performance and speed out of the box.' },
  { icon: '✍️', title: 'Easy Content', desc: 'Manage all your blog posts from Strapi CMS with zero code changes needed.' },
  { icon: '🎨', title: 'Beautiful Design', desc: 'Crafted with care for a clean, modern aesthetic that users will love.' },
  { icon: '🔒', title: 'Secure & Reliable', desc: 'PostgreSQL database ensures your content is safe and never gets lost.' },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: '100px 24px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 900,
            color: '#0a0a0a',
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}>
            Why Choose Us
          </h2>
          <p style={{ color: '#888', fontSize: '18px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Everything you need to launch a professional website quickly.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              padding: '36px 32px',
              borderRadius: '20px',
              backgroundColor: '#fafafa',
              border: '1px solid #f0f0f0',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <span style={{ fontSize: '40px', marginBottom: '20px', display: 'block' }}>{f.icon}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ color: '#888', fontSize: '15px', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}