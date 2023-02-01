import { wait, render, screen } from 'test-utils';
import dayjs from 'dayjs';
// Constants
import { HOME } from 'constants/routes';
// Components
import PageWrapper from './PageWrapper';

const mockHeadComponent = jest.fn();
// eslint-disable-next-line react/display-name
jest.mock('layouts/Head/Head', () => (props: any): JSX.Element => {
  mockHeadComponent(props);
  return <title>Some title</title>;
});

describe('layouts/PageWrapper/PageWrapper', () => {
  it('should render basic components', async () => {
    const childrenContent = 'Some dummy children';

    render(
      <PageWrapper>
        <p>{childrenContent}</p>
      </PageWrapper>,
      {
        wrapperProps: {
          router: {
            pathname: HOME,
          },
        },
      }
    );
    await wait();

    expect(mockHeadComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'The list of SpaseX ships',
        description: 'The example of page with paginated list',
      })
    );

    expect(screen.getByRole('link', { name: /Kofa logo/i })).toHaveAttribute(
      'title',
      'Go home'
    );
    expect(screen.getByRole('link', { name: /Kofa logo/i })).toHaveAttribute(
      'href',
      HOME
    );

    expect(screen.getByRole('img', { name: /Kofa logo/i })).toHaveAttribute(
      'alt',
      'Kofa logo'
    );
    expect(screen.getByRole('img', { name: /Kofa logo/i })).toHaveAttribute(
      'src',
      '/kofa-logo.svg'
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();

    expect(screen.getByText(childrenContent)).toBeInTheDocument();

    expect(screen.getByText(`© Kofa ${dayjs().year()}`)).toBeInTheDocument();
  });
});
