import { wait, render, screen, userEvent } from 'test-utils';
// Constants
import { HOME, USERS } from 'constants/routes';
// Components
import SideBarMenu from './SideBarMenu';

describe('layouts/SideBarMenu/SideBarMenu', () => {
  it('should render basic components', async () => {
    render(<SideBarMenu />);
    await wait();

    expect(screen.getByRole('menu')).toBeInTheDocument();

    expect(
      screen.getByRole('menuitem', { name: /appstore Pagination Example/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /appstore/i })).toBeInTheDocument();

    expect(
      screen.getByRole('menuitem', { name: /fall Select Random Page/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /fall/i })).toBeInTheDocument();
  });

  it('should properly toggle sidebar menu', async () => {
    render(<SideBarMenu />);
    await wait();

    const expandedClassName =
      'ant-layout-sider ant-layout-sider-dark ant-layout-sider-has-trigger';
    const collapsedClassName =
      'ant-layout-sider ant-layout-sider-dark ant-layout-sider-collapsed ant-layout-sider-has-trigger';

    expect(screen.getByRole('complementary')).toHaveClass(expandedClassName);

    await userEvent.click(screen.getByRole('img', { name: 'left' }));

    expect(screen.getByRole('complementary')).toHaveClass(collapsedClassName);

    await userEvent.click(screen.getByRole('img', { name: 'right' }));

    expect(screen.getByRole('complementary')).toHaveClass(expandedClassName);
  });

  it('should properly handle the click on menu item', async () => {
    const pushMock = jest.fn().mockImplementation(() => Promise.resolve());

    render(<SideBarMenu />, {
      wrapperProps: {
        router: {
          pathname: HOME,
          push: pushMock,
        },
      },
    });
    await wait();

    await userEvent.click(
      screen.getByRole('menuitem', {
        name: /user CRUD Example/i,
      })
    );

    expect(pushMock).toBeCalledTimes(1);
    expect(pushMock).toBeCalledWith(USERS);
  });
});
