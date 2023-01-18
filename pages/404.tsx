import { Result, Button } from 'antd';
import { useRouter } from 'next/router';
// Constants
import { HOME } from 'constants/routes';
// Layouts
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(HOME).then();
  };

  return (
    <LayoutWrapper
      title="Page not found"
      description="Page not found"
      withSidebar={false}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleGoHome}>
            Back Home
          </Button>
        }
      />
    </LayoutWrapper>
  );
};

export default NotFoundPage;
