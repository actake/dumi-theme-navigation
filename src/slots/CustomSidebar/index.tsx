import OriginSidebar from 'dumi/theme/slots/Sidebar';
import React from 'react';
import { useCustomData } from '../../context';
import { useCheck } from '../../hooks';
import { NestedSidebar } from '../NestedSidebar';

export interface CustomSidebarProps {}

export const CustomSidebar: React.FC<CustomSidebarProps> = () => {
  const {
    sidebar: { current: currentNavSidebar },
  } = useCustomData();
  const { shouldEnableNestedSidebar } = useCheck();

  if (shouldEnableNestedSidebar(currentNavSidebar?.link)) {
    return <NestedSidebar />;
  }

  return <OriginSidebar />;
};
