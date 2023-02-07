import { useSiteData } from 'dumi';
import { ThemeConfig } from '../type';

export const useThemeConfig = (): ThemeConfig => {
  const {
    themeConfig: { nav, ...restThemeConfig },
  } = useSiteData();

  const transformNavData = (): ThemeConfig['nav'] => {
    // 将 nav 源数据进行转换
    if (!nav) {
      return [];
    }

    return Object.values(nav);
  };

  return { ...restThemeConfig, nav: transformNavData() };
};
