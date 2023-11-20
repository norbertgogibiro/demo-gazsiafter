import React, { useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { AppContext } from "../../../../misc";
import styles from "./MobileMenuToggler.module.scss";

const MobileMenuToggler = ({
  className,
  isMobileMenuOpen,
  setMobileMenuOpenState,
}) => {
  const { themeClassName, isFullPageViewMode } = useContext(AppContext);

  return (
    <div
      className={classNames(
        styles.main,
        styles[themeClassName],
        {
          [styles.isMobileMenuOpen]: isMobileMenuOpen,
          [styles.isFullPageViewMode]: isFullPageViewMode,
        },
        className,
      )}
    >
      <button onClick={() => setMobileMenuOpenState(!isMobileMenuOpen)}>
        {Array(3)
          .fill()
          .map((_, index) => (
            <div key={index} className={styles.mobileMenuBar} />
          ))}
      </button>
    </div>
  );
};

MobileMenuToggler.propTypes = {
  className: PropTypes.string,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpenState: PropTypes.func.isRequired,
};

export default MobileMenuToggler;
