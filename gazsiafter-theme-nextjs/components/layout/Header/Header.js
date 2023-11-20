import React, { useContext, useRef, useEffect } from "react";
import classNames from "classnames";
import { useSlowGrowingStarUIChangesDelay } from "../../../common/hooks";
import { AppContext } from "../../misc";
import { SiteLogo } from "../../elements";
import NavMenu from "./components/NavMenu/NavMenu";
import MobileMenuToggler from "./components/MobileMenuToggler/MobileMenuToggler";
import styles from "./Header.module.scss";

const Header = () => {
  const refHeader = useRef();
  const hasUIChangeBeenDelayed = useSlowGrowingStarUIChangesDelay();
  const { isMobileMenuOpen, setMobileMenuOpenState, themeClassName } =
    useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (!refHeader.current.contains(target)) {
        setMobileMenuOpenState(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={refHeader}
      className={classNames(styles.main, styles[themeClassName], {
        [styles.isFullPageViewMode]: hasUIChangeBeenDelayed,
      })}
    >
      <SiteLogo />
      <MobileMenuToggler
        className={styles.mobileMenuToggler}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpenState={setMobileMenuOpenState}
      />
      <NavMenu />
    </header>
  );
};

export default Header;
