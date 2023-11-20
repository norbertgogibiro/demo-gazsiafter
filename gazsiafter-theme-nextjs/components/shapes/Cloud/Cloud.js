import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SvgPathAnimation, SvgWrapper, AppContext } from "../../misc";
import { getParsedCssTime } from "../../../common/utils";
import { width, height, coordinatesStart, coordinatesEnd } from "./Cloud.utils";
import styles from "./Cloud.module.scss";

const getNewTimestamp = (dateObject = new Date()) => {
  return dateObject.getTime().toString();
};
const Cloud = ({ isInverted }) => {
  const [lastRerender, setLastRerender] = useState(getNewTimestamp());
  const { themeClassName, isEyeTripping } = useContext(AppContext);
  const parsedPulsingTransitionTime = getParsedCssTime(
    styles.pulsingTransitionTime,
  );

  useEffect(() => {
    const rerenderCloudFromScratch = () => {
      setLastRerender(getNewTimestamp());
    };

    window.addEventListener("resize", rerenderCloudFromScratch);

    return () => {
      window.removeEventListener("resize", rerenderCloudFromScratch);
    };
  }, []);

  return (
    <div
      key={lastRerender}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={classNames(styles.main, styles[themeClassName], {
        [styles.isEyeTripping]: isEyeTripping,
        [styles.isInverted]: isInverted,
      })}
    >
      <SvgWrapper width={width} height={height} className={styles.shape}>
        <path d={coordinatesStart}>
          <SvgPathAnimation
            duration={parsedPulsingTransitionTime}
            coordinatesStart={coordinatesStart}
            coordinatesEnd={coordinatesEnd}
          />
        </path>
      </SvgWrapper>
    </div>
  );
};

Cloud.propTypes = {
  isInverted: PropTypes.bool,
};

export default Cloud;
