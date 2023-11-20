import React, { useState, useEffect, useCallback, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { AppContext } from "../../../misc";
import { getRandomAmount, getParsedCssTime } from "../../../../common/utils";
import { eyeBlinkTime } from "../Eye.module.scss";
import EyeContext from "../Eye.context";

import {
  eyeLidsWidthSimple,
  eyeLidsWidthCross,
  eyeLidsHeight,
  coordinatesSimpleOpen,
  coordinatesSimpleClosed,
  coordinatesCrossOpen,
  coordinatesCrossClosed,
} from "../Eye.utils";

import {
  SvgWrapper,
  SvgPathAnimation,
  SvgAnimationKeyframe,
} from "../../../misc";
import { useRouter } from "next/router";

const clickEventName = "click";
const blinkTriggers = {
  none: "none",
  click: clickEventName,
  auto: "auto",
};

const EyeLids = (props) => {
  const parsedEyeBlinkTime = getParsedCssTime(eyeBlinkTime);

  const {
    className,
    isCrossShape,
    shouldClose = false,
    shouldBlinkAutomatically = false,
    shouldBlinkOnClick = false,
    shouldNotBlinkAtAll = false,
    minWaitingBeforeBlinking = parsedEyeBlinkTime,
    maxWaitingBeforeBlinking = 5500,
    animationDelay,
    animationRepeatCount = "0",
    animationFillMode = "freeze",
    keyframes = [
      new SvgAnimationKeyframe("start", 0),
      new SvgAnimationKeyframe("end", 1),
    ],
  } = props;

  const router = useRouter();
  const [isOpen, setOpenState] = useState(true);
  const [timerIds, setTimerIds] = useState([]);
  const [lastBlinkingWaitTime, setLastBlinkingWaitTime] = useState(0);
  const { isEyeTripping } = useContext(AppContext);
  const { eyeLidsClass, simpleShapedClass, crossShapedClass } =
    useContext(EyeContext);

  const [isAutoBlinkingAllowed, setAutoBlinkingPermission] = useState(
    shouldBlinkAutomatically && !shouldClose,
  );

  const [blinkingTriggeredBy, setBlinkingTriggeredBy] = useState(
    blinkTriggers.none,
  );

  const coordinatesClosed = isCrossShape
    ? coordinatesCrossClosed
    : coordinatesSimpleClosed;

  const coordinatesOpen = isCrossShape
    ? coordinatesCrossOpen
    : coordinatesSimpleOpen;

  const coordinatesStart = isOpen ? coordinatesClosed : coordinatesOpen;
  const coordinatesEnd = isOpen ? coordinatesOpen : coordinatesClosed;
  const shapeWidth = isCrossShape ? eyeLidsWidthCross : eyeLidsWidthSimple;

  const triggerBlinking = (triggeredBy) => {
    setBlinkingTriggeredBy(triggeredBy);
  };

  const clearAllTimers = () => {
    timerIds.forEach((timerId) => clearTimeout(timerId));
  };

  const handleDocumentClick = useCallback(() => {
    triggerBlinking(blinkTriggers.click);
  });

  const blink = () => {
    if (!shouldNotBlinkAtAll && !router.query.view) {
      setOpenState(false);
      clearAllTimers();
      setTimerIds([
        ...timerIds,
        setTimeout(() => {
          setOpenState(!shouldClose);
          setBlinkingTriggeredBy(blinkTriggers.none);
        }, parsedEyeBlinkTime),
      ]);
    }
  };

  // Make the eye blink automatically:
  useEffect(() => {
    if (
      isOpen &&
      isAutoBlinkingAllowed &&
      blinkingTriggeredBy !== blinkTriggers.click
    ) {
      const randomBlinkWaitingTime = getRandomAmount(
        minWaitingBeforeBlinking,
        maxWaitingBeforeBlinking,
      );

      const blinkSpeedDice = [
        minWaitingBeforeBlinking,
        randomBlinkWaitingTime,
        randomBlinkWaitingTime,
        randomBlinkWaitingTime,
      ];

      const {
        [Math.round(getRandomAmount(0, blinkSpeedDice.length - 1))]:
          waitingTimeBeforeBlinking,
      } = blinkSpeedDice.filter(
        (diceValue) => diceValue !== lastBlinkingWaitTime,
      );

      setTimerIds([
        ...timerIds,
        setTimeout(
          () => triggerBlinking(blinkTriggers.auto),
          waitingTimeBeforeBlinking,
        ),
      ]);
      setLastBlinkingWaitTime(randomBlinkWaitingTime);
    }
  }, [isOpen, isAutoBlinkingAllowed]);

  // Update blinking permission:
  useEffect(() => {
    setAutoBlinkingPermission(shouldBlinkAutomatically && !shouldClose);
    setOpenState(!shouldClose);
  }, [shouldBlinkAutomatically, shouldClose]);

  // Check for triggered blinking:
  useEffect(() => {
    if (
      blinkingTriggeredBy !== blinkTriggers.none &&
      isAutoBlinkingAllowed &&
      !shouldClose
    ) {
      blink();
    }

    if (shouldClose) {
      clearAllTimers();
      setOpenState(false);
    }
  }, [blinkingTriggeredBy, isAutoBlinkingAllowed, shouldClose]);

  // Handle tripping eye state change:
  useEffect(() => {
    if (!shouldClose) {
      blink();
    }
  }, [isEyeTripping]);

  // Set document click handler:
  useEffect(() => {
    const removeDocumentClickHandler = () =>
      document.removeEventListener(clickEventName, handleDocumentClick);

    if (shouldBlinkOnClick && blinkingTriggeredBy === blinkTriggers.none) {
      document.addEventListener(clickEventName, handleDocumentClick);
    } else {
      removeDocumentClickHandler();
    }

    return () => removeDocumentClickHandler();
  }, [shouldBlinkOnClick, blinkingTriggeredBy]);

  return (
    <SvgWrapper
      key={isOpen}
      className={classNames(
        className,
        eyeLidsClass,
        isCrossShape ? crossShapedClass : simpleShapedClass,
      )}
      width={shapeWidth}
      height={eyeLidsHeight}
      viewBox={`0 0 ${shapeWidth} ${eyeLidsHeight}`}
    >
      <path d={coordinatesStart}>
        <SvgPathAnimation
          duration={parsedEyeBlinkTime}
          delay={animationDelay}
          coordinatesStart={coordinatesStart}
          coordinatesEnd={coordinatesEnd}
          keyframes={keyframes}
          repeatCount={animationRepeatCount}
          fillMode={animationFillMode}
        />
      </path>
    </SvgWrapper>
  );
};

EyeLids.propTypes = {
  className: PropTypes.string,
  isCrossShape: PropTypes.bool,
  shouldClose: PropTypes.bool,
  shouldBlinkAutomatically: PropTypes.bool,
  shouldBlinkOnClick: PropTypes.bool,
  shouldNotBlinkAtAll: PropTypes.bool,
  animationRepeatCount: PropTypes.number,
  animationDelay: PropTypes.number,
  animationFillMode: PropTypes.string,
  minWaitingBeforeBlinking: PropTypes.number,
  maxWaitingBeforeBlinking: PropTypes.number,
  handleTrippingEyeStateChange: PropTypes.func,
  keyframes: PropTypes.arrayOf(PropTypes.instanceOf(SvgAnimationKeyframe)),
};

export default EyeLids;
