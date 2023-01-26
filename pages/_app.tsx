import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
// Constants
import { HOME, NOT_FOUND } from 'constants/routes';
// Layouts
import PageWrapper from 'layouts/PageWrapper/PageWrapper';
// Styles
import 'styles/globals.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { pathname } = useRouter();

  const routesData: Record<string, { title: string; description: string }> = {
    [HOME]: {
      title: 'The list of SpaseX ships',
      description: 'The example of page with paginated list',
    },
    [NOT_FOUND]: {
      title: 'Page not found',
      description: 'Page not found',
    },
  };

  return (
    <PageWrapper
      title={routesData[pathname].title}
      description={routesData[pathname].description}
      withSidebar={pathname !== NOT_FOUND}
    >
      <Component {...pageProps} />
    </PageWrapper>
  );
};

export default App;
