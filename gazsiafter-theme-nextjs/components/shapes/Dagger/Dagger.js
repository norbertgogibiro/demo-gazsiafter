import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Dagger.module.scss";
import { AppContext } from "../../misc";

const Dagger = ({ isHidden }) => {
  const { themeClassName } = useContext(AppContext);

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.isHidden]: isHidden,
      })}
    >
      <div className={classNames(styles.main, styles[themeClassName])}>
        <div className={styles.fill} />
      </div>
    </div>
  );
};

Dagger.propTypes = { isHidden: PropTypes.bool };

export default Dagger;
