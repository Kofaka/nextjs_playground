import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import dayjs from 'dayjs';
import { ConfigProvider, Layout, Space, Spin, theme } from 'antd';
// Hooks
import { useHasMounted } from 'hooks';
// Constants
import { HOME, USERS, NOT_FOUND } from 'constants/routes';
// Layouts
import Head from 'layouts/Head/Head';
import SideBarMenu from 'layouts/SideBarMenu/SideBarMenu';
// Styles
import styles from './PageWrapper.module.scss';

const { Header, Content, Footer } = Layout;

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const { pathname } = useRouter();
  const hasMounted = useHasMounted();

  const routesData: Record<string, { title: string; description: string }> = {
    [HOME]: {
      title: 'The list of SpaseX ships',
      description: 'The example of page with paginated list',
    },
    [USERS]: {
      title: 'Manage Users',
      description: 'The example of page with table and CRUD',
    },
    [NOT_FOUND]: {
      title: 'Page not found',
      description: 'Page not found',
    },
  };

  return (
    <>
      <Head
        title={routesData[pathname].title}
        description={routesData[pathname].description}
      />

      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgBase: '#070025',
            colorBgLayout: '#070025',
          },
        }}
      >
        <Layout className={styles.root}>
          <Header className={styles.header}>
            <Link
              href={HOME}
              title="Go home"
              className={styles.logoWrapper}
              prefetch={false}
              passHref
            >
              <NextImage
                src="/kofa-logo.svg"
                alt="Kofa logo"
                blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                width={46}
                height={46}
                priority
              />
            </Link>
          </Header>

          <Layout>
            {pathname !== NOT_FOUND && <SideBarMenu />}

            <Layout>
              <Content
                className={cn(styles.body, { [styles.loading]: !hasMounted })}
              >
                {hasMounted ? (
                  children
                ) : (
                  <Space direction="vertical" align="center">
                    <Spin spinning size="large" />
                  </Space>
                )}
              </Content>

              <Footer className={styles.footer}>
                <p>© Kofa {dayjs().year()}</p>
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default PageWrapper;
