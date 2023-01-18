import { ReactNode } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import NextImage from 'next/image';
import { ConfigProvider, Layout, theme } from 'antd';
// Constants
import { HOME } from 'constants/routes';
// Layouts
import Head from 'layouts/Head/Head';
import SideBarMenu from 'layouts/SideBarMenu/SideBarMenu';
// Styles
import styles from './LayoutWrapper.module.scss';

const { Header, Content, Footer } = Layout;

type LayoutWrapperProps = {
  title: string;
  description: string;
  withSidebar?: boolean;
  children: ReactNode;
};

const LayoutWrapper = ({
  title,
  description,
  withSidebar = true,
  children,
}: LayoutWrapperProps) => {
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
              <Content className={styles.body}>{children}</Content>

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

export default LayoutWrapper;
