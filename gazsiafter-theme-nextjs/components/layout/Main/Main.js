import React, { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../../misc";
import ViewManager from "../../../views";
import { Cloud, TearDrop, Star, Eye } from "../../shapes";
import styles from "./Main.module.scss";

const Main = () => {
  const { themeClassName, isEyeTripping } = useContext(AppContext);

  return (
    <main className={styles.main}>
      <div
        className={classNames(styles.canvas, styles[themeClassName], {
          [styles.isEyeTripping]: isEyeTripping,
        })}
      >
        <Cloud />
        <Cloud isInverted />
        <TearDrop />
        <div className={styles.layerPattern} />
        <Star>
          <ViewManager />
        </Star>
        <Eye />
      </div>
    </main>
  );
};

export default Main;
