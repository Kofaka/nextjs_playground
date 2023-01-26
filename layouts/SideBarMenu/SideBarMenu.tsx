import { useState, ReactNode, Key } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, MenuProps } from 'antd';
import { SelectInfo } from 'rc-menu/lib/interface';
import {
  FallOutlined,
  UngroupOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
// Constants
import { HOME } from 'constants/routes';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const SideBarMenu = (): JSX.Element => {
  const { pathname, push } = useRouter();

  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(false);

  const handleSidebarCollapseToggle = () => {
    setCollapsedSidebar((prev) => !prev);
  };

  const handleMenuItemSelect = ({ key }: SelectInfo) => {
    push(key).then();
  };

  const getMenuItem = (
    label: ReactNode,
    key?: Key | null,
    icon?: ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getMenuItem('Pagination Example', HOME, <AppstoreOutlined />),
    getMenuItem('Select Random Page', null, <FallOutlined />, [
      getMenuItem('Option 1', '/expanded-one', <UngroupOutlined />),
    ]),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsedSidebar}
      onCollapse={handleSidebarCollapseToggle}
    >
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        defaultSelectedKeys={[pathname]}
        onSelect={handleMenuItemSelect}
      />
    </Sider>
  );
};

export default SideBarMenu;
