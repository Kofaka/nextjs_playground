import { Result, Button } from 'antd';
import { useRouter } from 'next/router';
// Constants
import { HOME } from 'constants/routes';

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(HOME).then();
  };

  return (
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
  );
};

export default NotFoundPage;
