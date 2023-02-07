import { useFullSidebarData } from 'dumi';
import { useMemo } from 'react';
import { MenuItem, Menus } from '../type';
import { transformToArray, transformToNestedTree } from '../utils';
import { useGetter } from './useGetter';

export const useSidebarData = () => {
  const fullSidebarData = useFullSidebarData();
  const { getRootNav } = useGetter();

  const flatternSidebar = useMemo(() => {
    return Object.entries(fullSidebarData)
      .reduce<Menus>((prev, entriesItem) => {
        const [, sidebarItem] = entriesItem;
        return [...prev, ...transformToArray(sidebarItem[0]?.children)];
      }, [])
      .map((data) => {
        const currentNodeLinkArray = data?.link?.split('/');
        return {
          ...data,
          parentLink: currentNodeLinkArray
            .slice(0, currentNodeLinkArray.length - 1)
            .join('/'),
        };
      })
      .sort((prev, next) => {
        return (prev.order || 0) - (next.order || 0);
      });
  }, [fullSidebarData]);

  const allNestedSidebar = useMemo(() => {
    return transformToNestedTree<MenuItem>(flatternSidebar);
  }, [flatternSidebar]);

  const currentSidebar = useMemo(() => {
    return (allNestedSidebar?.find(
      (sidebar) => getRootNav() === sidebar.link,
    ) || {}) as MenuItem;
  }, [allNestedSidebar, getRootNav]);

  return {
    flattern: flatternSidebar,
    nested: allNestedSidebar,
    current: currentSidebar,
  };
};
