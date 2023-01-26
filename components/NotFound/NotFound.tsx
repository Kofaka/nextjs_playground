import { useRouter } from 'next/router';
import { Result, Button } from 'antd';
// Constants
import { HOME } from 'constants/routes';

const NotFound = () => {
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

export default NotFound;
