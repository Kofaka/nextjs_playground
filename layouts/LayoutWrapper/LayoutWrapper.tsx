import { ReactNode } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
// Layout
import Head from 'layouts/Head/Head';

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
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Head title={title} description={description} />

      <Layout>
        <Header>Header</Header>

        <Content className="site-layout">{children}</Content>

        <Footer>Footer</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutWrapper;
