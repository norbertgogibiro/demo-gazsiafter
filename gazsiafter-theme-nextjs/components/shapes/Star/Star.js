import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppContext } from "../../misc";
import { getParsedCssTime } from "../../../common/utils";
import { Dagger } from "../index";
import linkUrlStyles from "../../elements/LinkUrl/LinkUrl.module.scss";
import styles from "./Star.module.scss";

import {
  polygonStarSqueezed,
  polygonStarExpanded,
  polygonStarSquared,
} from "./Star.utils";
import { useSlowGrowingStarDelay } from "../../../common/hooks";

const squaringAnimationClasses = {
  initial: null,
  in: styles.isSquaringIn,
  done: styles.isSquared,
  out: styles.isSquaringOut,
};

const Star = ({ children }) => {
  const router = useRouter();

  const {
    themeClassName,
    isEyeTripping,
    lastDropTriggerTime,
    setEyeClosed,
    isFullPageViewMode,
  } = useContext(AppContext);

  const { view } = router.query;
  const shouldTurnIntoSquare = view && !isFullPageViewMode;

  const initialStarShape = shouldTurnIntoSquare
    ? polygonStarSquared
    : polygonStarSqueezed;

  const [starShape, setStarShape] = useState(initialStarShape);
  const [squaringAnimationClass, setSquaringAnimationClass] = useState(
    !view || isFullPageViewMode
      ? squaringAnimationClasses.initial
      : squaringAnimationClasses.done,
  );

  const previousStarShape = useRef(starShape);
  const refStarWrapper = useRef();

  const clickEventType = "click";
  const keyDownEventType = "keydown";

  const isSquaringAnimationInitial =
    squaringAnimationClass === squaringAnimationClasses.initial;

  const isSquaringAnimationIn =
    squaringAnimationClass === squaringAnimationClasses.in;

  const isSquaringAnimationDone =
    squaringAnimationClass === squaringAnimationClasses.done;

  const isSquaringAnimationOut =
    squaringAnimationClass === squaringAnimationClasses.out;

  const redirectToHomeView = (target) => {
    if (!target || !target.classList.contains(linkUrlStyles.main)) {
      router.push("/", null, { shallow: true });
    }
  };

  const handleDocumentClick = ({ target }) => {
    if (!refStarWrapper.current.contains(target)) {
      redirectToHomeView(target);
    }
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      redirectToHomeView();
    }
  };

  // Delaying the hover shrinking permission until the full
  // page view star has transitioned back completely:
  const isHoverShrinkingAllowed = useSlowGrowingStarDelay();

  // Setting the squaring animation class name:
  useEffect(() => {
    const wasShapeSquared = starShape === polygonStarSquared;

    if (shouldTurnIntoSquare && !wasShapeSquared) {
      setSquaringAnimationClass(squaringAnimationClasses.in);
    } else if (!view && wasShapeSquared) {
      setSquaringAnimationClass(squaringAnimationClasses.out);
    }
  }, [view]);

  // Setting the squaring finish class name:
  useEffect(() => {
    if (!isSquaringAnimationDone) {
      const timeoutId = setTimeout(() => {
        setSquaringAnimationClass(
          isSquaringAnimationIn
            ? squaringAnimationClasses.done
            : squaringAnimationClasses.initial,
        );
      }, getParsedCssTime(styles.starSquaringTime));

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [squaringAnimationClass]);

  // Handle event listeners when the animation is done:
  useEffect(() => {
    // Add event listeners when star shape has turned into square:
    if (isSquaringAnimationDone || isFullPageViewMode) {
      document.addEventListener(clickEventType, handleDocumentClick);
      document.addEventListener(keyDownEventType, handleKeyDown);
    }

    // Remove event listeners when square shape has turned back into star:
    else if (isSquaringAnimationInitial) {
      document.removeEventListener(clickEventType, handleDocumentClick);
      document.removeEventListener(keyDownEventType, handleKeyDown);
    }

    return () => {
      document.removeEventListener(clickEventType, handleDocumentClick);
      document.removeEventListener(keyDownEventType, handleKeyDown);
    };
  }, [squaringAnimationClass, isFullPageViewMode]);

  // Setting the star's shape:
  useEffect(() => {
    previousStarShape.current = starShape;

    // Set the star shape to square:
    if (isSquaringAnimationIn) {
      setStarShape(polygonStarSquared);
    } else if (isSquaringAnimationOut) {
      setStarShape(initialStarShape);
    }

    // Toggle between squeezed and expanded star shapes:
    else if (isSquaringAnimationInitial) {
      const timerId = setTimeout(
        () => {
          setStarShape(
            starShape === polygonStarExpanded
              ? polygonStarSqueezed
              : polygonStarExpanded,
          );
        },
        previousStarShape.current !== polygonStarSquared
          ? getParsedCssTime(styles.starPulsingTime)
          : 0,
      );

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [starShape, squaringAnimationClass]);

  // Restart the star shrinking animation when drops get triggered:
  useEffect(() => {
    refStarWrapper.current.style.animation = "none";
    setTimeout(() => {
      refStarWrapper.current.style.animation = "";
    }, 0);
  }, [lastDropTriggerTime]);

  // Close the eye when there is a non-full page view displayed:
  useEffect(() => {
    if (!!view) {
      setEyeClosed(true);
    } else {
      const timerId = setTimeout(() => {
        setEyeClosed(false);
      }, getParsedCssTime(styles.starSquaringTime));

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [view]);

  return (
    <div
      ref={refStarWrapper}
      className={classNames(styles.wrapper, squaringAnimationClass, {
        [styles.haveDropsBeenTriggered]: !!lastDropTriggerTime,
        [styles.isEyeTripping]: isEyeTripping,
        [styles.isFullPage]: isFullPageViewMode,
        [styles.isHoverShrinking]:
          !squaringAnimationClass &&
          !isFullPageViewMode &&
          isHoverShrinkingAllowed,
      })}
    >
      <Dagger isHidden={!isSquaringAnimationDone && !isSquaringAnimationIn} />

      <div
        className={classNames(styles.main, styles[themeClassName])}
        style={{ clipPath: `polygon(${starShape})` }}
      >
        <div
          hidden={!isSquaringAnimationDone && !isFullPageViewMode}
          className={styles.contentWrapper}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Star.propTypes = {
  children: PropTypes.node,
};

export default Star;
