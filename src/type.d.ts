import { INavItem, IThemeConfig } from 'dumi/dist/client/theme-api/types';

// 自定义菜单项的类型
export type MenuItem = {
  title: string;
  link: string;
  order?: number;
  frontmatter?: IRouteMeta['frontmatter'];
  children?: MenuItem[];
};

// 自定义菜单数据的类型
export type Menus = MenuItem[];

// 自定义导航项类型
export type NavItem = INavItem & { nestedSidebar?: boolean };

// 自定义导航数据类型
export type Nav = NavItem[];

export interface ThemeConfig extends Omit<IThemeConfig, 'nav'> {
  nav?: Nav;
}
