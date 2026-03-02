'use client';

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#0A0A0A',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        color: 'white',
        padding: '18px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'end',
      }}
    >
      {/* Left - Socials */}
      <div style={{ display: 'flex', gap: '24px' }}>
        <a
          href="https://instagram.com/josepeoon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:opacity-70 transition-opacity cursor-none"
        >
          INSTAGRAM
        </a>
        <a
          href="https://linkedin.com/in/josepeoon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:opacity-70 transition-opacity cursor-none"
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/josepeon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:opacity-70 transition-opacity cursor-none"
        >
          GITHUB
        </a>
      </div>

      {/* Center - Name & Contact */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ lineHeight: '1', marginBottom: '4px' }}>JOSE PEON</span>
        <a
          href="mailto:JOSE@OH.SYSTEMS"
          className="text-white hover:opacity-70 transition-opacity cursor-none"
        >
          JOSE@OH.SYSTEMS
        </a>
      </div>

      {/* Right - Title */}
      <div style={{ textAlign: 'right' }}>
        <span>AI ENGINEER</span>
      </div>
    </footer>
  );
}
