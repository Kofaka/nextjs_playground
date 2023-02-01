import type { AppProps } from 'next/app';
// Layouts
import PageWrapper from 'layouts/PageWrapper/PageWrapper';
// Styles
import 'styles/globals.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <PageWrapper>
      <Component {...pageProps} />
    </PageWrapper>
  );
};

export default App;
