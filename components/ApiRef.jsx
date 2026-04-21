import dynamic from 'next/dynamic';

const ApiReference = dynamic(
  () => import('@scalar/nextjs-api-reference').then((m) => m.ApiReference),
  { ssr: false, loading: () => <p style={{ padding: '2rem', opacity: 0.6 }}>Loading API reference…</p> }
);

export default function ApiRef(props) {
  return <ApiReference {...props} />;
}
