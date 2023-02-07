import React, { useContext } from 'react';
import { useSidebarData, useThemeConfig } from './hooks';
import { MenuItem, ThemeConfig } from './type';

export interface CustomData {
  sidebar: ReturnType<typeof useSidebarData>;
  ThemeConfig: Partial<ThemeConfig>;
}

const CustomDataContext = React.createContext<CustomData>({
  sidebar: { flattern: [], nested: [], current: {} as MenuItem },
  ThemeConfig: {},
});

export const CustomDataProvider = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const customSidebarData = useSidebarData();
  const ThemeConfig = useThemeConfig();

  return (
    <CustomDataContext.Provider
      value={{
        sidebar: customSidebarData,
        ThemeConfig,
      }}
    >
      {children}
    </CustomDataContext.Provider>
  );
};

export const useCustomData = () => {
  return useContext<CustomData>(CustomDataContext);
};

export interface HOC<
  InputProps = Record<string, any>,
  OutputProps = Record<string, any>,
> {
  <T = Record<string, any>>(
    Comp: React.ComponentType<T & InputProps>,
  ): React.ComponentType<T & OutputProps>;
}

export const withCustomDataContext: HOC = (Comp) => {
  return (props) => {
    return (
      <CustomDataProvider>
        <Comp {...props} />
      </CustomDataProvider>
    );
  };
};
