import { useRouter } from 'next/router';

export default {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
      <span style={{ color: '#6366f1' }}>E3D</span> Docs
    </span>
  ),
  project: {
    link: 'https://github.com/spacepacket1/e3d-docs',
  },
  docsRepositoryBase: 'https://github.com/spacepacket1/e3d-docs/blob/main',
  useNextSeoProps() {
    const { asPath } = useRouter();
    return {
      titleTemplate: asPath === '/' ? 'E3D Developer Docs' : '%s — E3D Docs',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="E3D API developer documentation — blockchain intelligence beyond prices."
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  primaryHue: 220,
  navbar: {
    extraContent: (
      <a
        href="https://e3d.ai/signup"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#6366f1',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Get API Key →
      </a>
    ),
  },
  footer: {
    text: (
      <span>
        © {new Date().getFullYear()} E3D.ai — <a href="https://e3d.ai">e3d.ai</a>
      </span>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
};
