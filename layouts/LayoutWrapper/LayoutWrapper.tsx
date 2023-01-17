import { ReactNode } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { ConfigProvider, Layout, theme } from 'antd';
// Constants
import { HOME } from 'constants/routes';
// Layout
import Head from 'layouts/Head/Head';
// Styles
import styles from './LayoutWrapper.module.scss';

const { Header, Footer, Content } = Layout;

type LayoutWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const LayoutWrapper = ({
  title,
  description,
  children,
}: LayoutWrapperProps) => {
  return (
    <>
      <Head title={title} description={description} />

      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Layout>
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
                width={56}
                height={56}
                priority
              />
            </Link>
          </Header>

          <Content className="site-layout">{children}</Content>

          <Footer>Footer</Footer>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default LayoutWrapper;