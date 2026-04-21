import '../styles/globals.css';

// MetaMask's SES lockdown modifies IntersectionObserver so even valid
// rootMargin values throw. Wrap it globally so nextra degrades gracefully.
if (typeof window !== 'undefined') {
  const _IO = window.IntersectionObserver;
  if (_IO) {
    window.IntersectionObserver = function SafeIO(cb, opts) {
      try {
        return new _IO(cb, opts);
      } catch (e) {
        return { observe() {}, unobserve() {}, disconnect() {} };
      }
    };
    window.IntersectionObserver.prototype = _IO.prototype;
  }
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
