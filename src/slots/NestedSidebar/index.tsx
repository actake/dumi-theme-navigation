import { Menu, MenuProps } from 'antd';
import { NavLink, useLocation } from 'dumi';
import { isEmpty, omit } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useCustomData } from '../../context';
import { useCheck } from '../../hooks';
import { MenuItem, Menus } from '../../type';
import { transformToArray } from '../../utils';

import './index.less';

export interface NestedSidebarProps {}

// 获取菜单标题
const getMenuTitle = (menuData: MenuItem) => {
  const { title, frontmatter: { title: frontmatterTitle = '' } = {} } =
    menuData;
  return frontmatterTitle || title;
};

/**
 * 获取菜单路径（从根节点开始到当前节点）
 */
const getNestedMenuPath = (
  menuTree: Menus,
  targetMenuPath: string,
  pathStore?: string[],
): string[] => {
  if (!pathStore) {
    // eslint-disable-next-line
    pathStore = [];
  }

  for (const node of transformToArray(menuTree)) {
    let tempPathStore = [...pathStore];
    tempPathStore.push(node?.link);
    if (node?.link === targetMenuPath) {
      return tempPathStore;
    }
    if (node?.children) {
      const result = getNestedMenuPath(
        node.children,
        targetMenuPath,
        tempPathStore,
      );

      if (result && !isEmpty(result)) {
        return result;
      }
    }
  }

  return [];
};

const LEAF_SUFFIX = '-leaf';

export const NestedSidebar = () => {
  const { pathname } = useLocation();
  const { isLeafMenu } = useCheck();
  const {
    sidebar: { current: currentNavSidebar },
  } = useCustomData();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const initKeys = () => {
    const newOpenKeys = getNestedMenuPath(
      transformToArray(currentNavSidebar),
      pathname,
    );
    const newSelectedKeys = newOpenKeys.map((key, index, arr) =>
      index === arr.length - 1 ? `${key}${LEAF_SUFFIX}` : key,
    );
    setOpenKeys(Array.from(new Set([...newOpenKeys, ...openKeys])));
    setSelectedKeys(newSelectedKeys);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  const onSelect: MenuProps['onSelect'] = ({ selectedKeys }) => {
    setSelectedKeys(selectedKeys);
  };

  useEffect(() => {
    initKeys();
  }, [pathname]);

  const renderChildren = (children: MenuItem) => {
    const title = getMenuTitle(children);
    const { link } = children;
    return (
      <Menu.Item key={`${link}${LEAF_SUFFIX}`}>
        <NavLink title={title} to={link} end>
          <span title={title}>{title}</span>
        </NavLink>
      </Menu.Item>
    );
  };

  const renderNestedMenu = (menuData: Menus | MenuItem) => {
    return transformToArray(menuData).map((item) => {
      if (isLeafMenu(item)) {
        return renderChildren(item);
      }

      return (
        <Menu.SubMenu key={item.link} title={item.link.split('/').at(-1)}>
          {item.children &&
            item.children.map((child: MenuItem) => {
              return renderNestedMenu(child);
            })}
          {item && renderChildren(item)}
        </Menu.SubMenu>
      );
    });
  };

  if (!currentNavSidebar) return null;

  return (
    <div className="dumi-nested-sidebar">
      <div className="dumi-nested-sidebar-group">
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
          onSelect={onSelect}
        >
          {renderNestedMenu(currentNavSidebar.children || [])}
          {renderChildren(omit(currentNavSidebar, 'children'))}
        </Menu>
      </div>
    </div>
  );
};
