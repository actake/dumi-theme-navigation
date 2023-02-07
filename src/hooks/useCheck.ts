import { useLocation } from 'dumi';
import { useCallback } from 'react';
import { useThemeConfig } from './useThemeConfig';

export const useCheck = () => {
  const { pathname } = useLocation();
  const { nav = [] } = useThemeConfig();

  /**
   * 目标路径是否启用嵌套菜单
   */
  const shouldEnableNestedSidebar = useCallback(
    (path: string = pathname) => {
      const enableNestedMenu = !!Object.values(nav).find(
        (navItem) => navItem?.nestedSidebar && path?.includes(navItem?.link),
      );

      return enableNestedMenu;
    },
    [nav, pathname],
  );

  /**
   * 目标路径是否嵌套菜单的根路径
   */
  const isRootNestedSidebarPath = useCallback(
    (path: string = pathname) => {
      return !!Object.values(nav).find((navItem) => path === navItem?.link);
    },
    [nav, pathname],
  );

  return {
    shouldEnableNestedSidebar,
    isRootNestedSidebarPath,
  };
};
