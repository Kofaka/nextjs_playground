import type { AppProps } from 'next/app';
// Styles
import 'styles/globals.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default App;
