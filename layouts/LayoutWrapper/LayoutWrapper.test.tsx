import { wait, render, screen } from 'test-utils';
import dayjs from 'dayjs';
// Constants
import { HOME } from 'constants/routes';
// Components
import LayoutWrapper from './LayoutWrapper';

const mockHeadComponent = jest.fn();
// eslint-disable-next-line react/display-name
jest.mock('layouts/Head/Head', () => (props: any): JSX.Element => {
  mockHeadComponent(props);
  return <title>Some title</title>;
});

describe('layouts/LayoutWrapper/LayoutWrapper', () => {
  it('should render basic components', async () => {
    const title = 'Some random title';
    const description = 'Some random description';
    const childrenContent = 'Some dummy children';

    render(
      <LayoutWrapper title={title} description={description}>
        <p>{childrenContent}</p>
      </LayoutWrapper>
    );
    await wait();

    expect(mockHeadComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        title,
        description,
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
