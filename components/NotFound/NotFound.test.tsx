import { render, screen, userEvent } from 'test-utils';
// Constants
import { HOME } from 'constants/routes';
// Components
import NotFound from './NotFound';

describe('components/NotFound/NotFound', () => {
  it('should render basic components', () => {
    render(<NotFound />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, the page you visited does not exist./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Back Home/i })
    ).toBeInTheDocument();
  });

  it('should properly handle the "Back Home" button click', async () => {
    const pushMock = jest.fn().mockImplementation(() => Promise.resolve());

    render(<NotFound />, {
      wrapperProps: {
        router: {
          pathname: 'some-not-existing-page',
          push: pushMock,
        },
      },
    });

    await userEvent.click(screen.getByRole('button', { name: /Back Home/i }));

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(HOME);
  });
});
