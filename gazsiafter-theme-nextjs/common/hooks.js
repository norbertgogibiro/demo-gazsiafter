import { useEffect, useState, useContext } from "react";
import { getParsedCssTime } from "./utils";
import { AppContext } from "../components/misc";
import {
  starSlowGrowingTime,
  slowGrowingStarUIChangesDelayTime,
} from "../components/shapes/Star/Star.module.scss";

export const useSlowGrowingStarUIChangesDelay = () => {
  const { isFullPageViewMode } = useContext(AppContext);
  const [hasUIChangeBeenDelayed, sethasUIChangeBeenDelayed] =
    useState(isFullPageViewMode);

  useEffect(() => {
    let timerId;

    setTimeout(() => {
      sethasUIChangeBeenDelayed(isFullPageViewMode);
    }, getParsedCssTime(slowGrowingStarUIChangesDelayTime) * 0.5);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isFullPageViewMode]);

  return hasUIChangeBeenDelayed;
};

export const useSlowGrowingStarDelay = () => {
  const { isFullPageViewMode, isEyeClosed } = useContext(AppContext);
  const [isHoverShrinkingAllowed, setIsHoverShrinkingAllowed] = useState(
    !isFullPageViewMode,
  );

  useEffect(() => {
    let timerId;

    const removeTimerId = () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };

    if (!isFullPageViewMode) {
      timerId = setTimeout(() => {
        setIsHoverShrinkingAllowed(true);
      }, getParsedCssTime(starSlowGrowingTime));
    } else {
      removeTimerId();
      setIsHoverShrinkingAllowed(false);
    }

    return removeTimerId;
  }, [isFullPageViewMode]);

  return isEyeClosed && isHoverShrinkingAllowed;
};
