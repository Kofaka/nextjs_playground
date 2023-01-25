import { ReactNode } from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import Link from 'next/link';
import NextImage from 'next/image';
import { ConfigProvider, Layout, Space, Spin, theme } from 'antd';
// Hooks
import { useHasMounted } from 'hooks';
// Constants
import { HOME } from 'constants/routes';
// Layouts
import Head from 'layouts/Head/Head';
import SideBarMenu from 'layouts/SideBarMenu/SideBarMenu';
// Styles
import styles from './PageWrapper.module.scss';

const { Header, Content, Footer } = Layout;

type PageWrapperProps = {
  title: string;
  description: string;
  withSidebar?: boolean;
  children: ReactNode;
};

const PageWrapper = ({
  title,
  description,
  withSidebar = true,
  children,
}: PageWrapperProps) => {
  const hasMounted = useHasMounted();

  return (
    <>
      <Head title={title} description={description} />

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
            {withSidebar && <SideBarMenu />}

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
