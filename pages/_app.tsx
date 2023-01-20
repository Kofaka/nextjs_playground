import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
// Constants
import { HOME, NEW_PAGE, NOT_FOUND } from 'constants/routes';
// Styles
import 'styles/globals.scss';
// Layouts
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { pathname } = useRouter();

  const routesData: Record<string, { title: string; description: string }> = {
    [HOME]: {
      title: 'The list of SpaseX ships',
      description: 'The example of page with paginated list',
    },
    [NEW_PAGE]: {
      title: 'Some dummy new page',
      description: 'Some dummy description',
    },
    [NOT_FOUND]: {
      title: 'Page not found',
      description: 'Page not found',
    },
  };

  return (
    <LayoutWrapper
      title={routesData[pathname].title}
      description={routesData[pathname].description}
      withSidebar={pathname !== NOT_FOUND}
    >
      <Component {...pageProps} />
    </LayoutWrapper>
  );
};

export default App;
