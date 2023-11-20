import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { AppContext } from "../../misc";
import {
  getParsedCssTime,
  getRandomAmount,
  getShuffledArray,
} from "../../../common/utils";
import Shape from "./TearDrop.shape.svg";
import styles from "./TearDrop.module.scss";

const numberOfDrops = 3;
const animationDelayGap = 200;
const defaultDropAngle = 45;

const TearDrop = () => {
  const router = useRouter();
  const dropAngleResetterTimerId = useRef();
  const [dropAngleDeg, setDropAngleDeg] = useState(defaultDropAngle);
  const [currentDrops, setCurrentDrops] = useState([]);
  const { lastDropTriggerTime, themeClassName } = useContext(AppContext);
  const parsedTearDropFallTime = getParsedCssTime(styles.tearDropFallTime);
  const { view } = router.query;

  useEffect(() => {
    if (lastDropTriggerTime) {
      const animationDelayDice = getShuffledArray(
        new Array(numberOfDrops)
          .fill()
          .map((_, index) => index * animationDelayGap),
      );

      const newDrops = new Array(numberOfDrops).fill().map((_, index) => ({
        dropId: uuid(),
        rotationAmount: (index - 1) * dropAngleDeg,
        animationDelay: animationDelayDice[index],
      }));

      setCurrentDrops([...currentDrops, ...newDrops]);

      // Offset the tear's angle when retriggered after a short time:
      setDropAngleDeg(getRandomAmount(20, 80));
    }
  }, [lastDropTriggerTime]);

  // Reset drop angles to default after not retriggering for a while:
  useEffect(() => {
    const previousTimerId = dropAngleResetterTimerId.current;
    if (previousTimerId) {
      clearTimeout(previousTimerId);
    }

    dropAngleResetterTimerId.current = setTimeout(() => {
      setDropAngleDeg(defaultDropAngle);
    }, parsedTearDropFallTime / 3);

    return () => {
      clearTimeout(dropAngleResetterTimerId.current);
    };
  }, [dropAngleDeg]);

  return currentDrops.map(
    ({ dropId: currentDropId, rotationAmount, animationDelay }) => (
      <div
        key={currentDropId}
        className={classNames(styles.main, { [styles.isViewShown]: !!view })}
        style={{ transform: `rotate(${rotationAmount}deg)` }}
      >
        <Shape
          className={classNames(styles.shape, styles[themeClassName])}
          style={{ animationDelay: `${animationDelay}ms` }}
          onAnimationEnd={() =>
            setCurrentDrops([
              ...currentDrops.filter(({ dropId }) => dropId !== currentDropId),
            ])
          }
        />
      </div>
    ),
  );
};

export default TearDrop;
