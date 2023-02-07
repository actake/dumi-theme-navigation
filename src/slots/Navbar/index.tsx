import { Link, useLocation } from 'dumi';
import NavbarExtra from 'dumi/theme/slots/NavbarExtra';
import React, { type FC } from 'react';
import { useCheck } from '../../hooks';
import { useNavData } from '../../hooks/useNavData';
import './index.less';

const Navbar: FC = () => {
  const nav = useNavData();
  const { pathname } = useLocation();
  const { shouldEnableNestedSidebar, isRootNestedSidebarPath } = useCheck();

  return (
    <ul className="dumi-default-navbar">
      {nav.map((item) => {
        const { link } = item;
        const navVisible = !(
          shouldEnableNestedSidebar(link) && !isRootNestedSidebarPath(link)
        );
        if (!navVisible) {
          return null;
        }

        return (
          <li key={item.link}>
            {/^(\w+:)\/\/|^(mailto|tel):/.test(item.link) ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            ) : (
              <Link
                to={item.link}
                {...(pathname.startsWith(item.activePath || item.link)
                  ? { className: 'active' }
                  : {})}
              >
                {item.title}
                {/* TODO: 2-level nav */}
              </Link>
            )}
          </li>
        );
      })}
      <NavbarExtra />
    </ul>
  );
};

export default Navbar;
