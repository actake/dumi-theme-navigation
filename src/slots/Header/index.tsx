import { ReactComponent as IconClose } from '@ant-design/icons-svg/inline-svg/outlined/close.svg';
import { ReactComponent as IconMenu } from '@ant-design/icons-svg/inline-svg/outlined/menu.svg';
import { useRouteMeta, useSiteData } from 'dumi';
import React, { useState, type FC } from 'react';
import HeaderExtra from '..//HeadeExtra';
import ColorSwitch from '../ColorSwitch';
import LangSwitch from '../LangSwitch';
import Logo from '../Logo';
import Navbar from '../Navbar';
import RtlSwitch from '../RtlSwitch';
import SearchBar from '../SearchBar';
import './index.less';

const Header: FC = () => {
  const { frontmatter } = useRouteMeta();
  const [showMenu, setShowMenu] = useState(false);
  const { themeConfig } = useSiteData();

  return (
    <div
      className="dumi-default-header"
      data-static={Boolean(frontmatter.hero) || undefined}
      data-mobile-active={showMenu || undefined}
      onClick={() => setShowMenu(false)}
    >
      <div className="dumi-default-header-content">
        <section className="dumi-default-header-left">
          <Logo />
        </section>
        <section className="dumi-default-header-right">
          <Navbar />
          <div className="dumi-default-header-right-aside">
            <SearchBar />
            <LangSwitch />
            <RtlSwitch />
            {themeConfig.prefersColor.switch && <ColorSwitch />}
            <HeaderExtra />
          </div>
        </section>
        <button
          type="button"
          className="dumi-default-header-menu-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            setShowMenu((v) => !v);
          }}
        >
          {showMenu ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </div>
  );
};

export default Header;
