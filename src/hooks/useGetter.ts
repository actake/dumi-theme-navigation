import { useLocation } from 'dumi';
import { useCallback } from 'react';

export const useGetter = () => {
  const { pathname } = useLocation();

  /**
   * 获取 path 对应的根路径
   */
  const getRootNav = useCallback(
    (path: string = pathname) => {
      return path.split('/').slice(0, 2).join('/');
    },
    [pathname],
  );

  return {
    getRootNav,
  };
};
