import {
  INavItem,
  IRouteMeta,
  IThemeConfig,
} from 'dumi/dist/client/theme-api/types';

/**
 * 自定义菜单项的类型
 */
export type MenuItem = {
  title: string;
  link: string;
  order?: number;
  frontmatter?: IRouteMeta['frontmatter'];
  children?: MenuItem[];
};

/**
 * 自定义菜单数据的类型
 */
export type Menus = MenuItem[];

/**
 * 自定义导航项类型
 */
export type NavItem = INavItem & {
  /**
   * 是否启用嵌套菜单，启用后子路由将使用 toc:content 模式
   */
  nestedSidebar?: boolean;
};

/**
 * 自定义导航数据类型
 */
export type Nav = NavItem[];

/**
 * 主题配置类型
 */
export interface ThemeConfig extends Omit<IThemeConfig, 'nav'> {
  nav?: Nav;
}
