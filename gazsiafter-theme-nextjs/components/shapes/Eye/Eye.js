import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { AppContext } from "../../misc";
import { useSlowGrowingStarDelay } from "../../../common/hooks";
import { getParsedCssTime, getRandomAmount } from "../../../common/utils";
import EyeLids from "./components/EyeLids";
import {
  eyeLidsWidthSimple,
  eyeLidsHeight,
  cursorFollowingTime,
} from "./Eye.utils";
import EyeContext from "./Eye.context";
import styles from "./Eye.module.scss";

const Eye = () => {
  const [isEyeHidden, setEyeHiddenState] = useState(false);
  const [componentDidMount, setComponentDidMount] = useState(false);
  const [isFollowingCursorMovement, setCursorFollowingMode] = useState(true);
  const refCursorFollower = useRef();
  const router = useRouter();

  const {
    themeClassName,
    isEyeClosed,
    isEyeTripping,
    setEyeClosed,
    setLastDropTriggerTime,
  } = useContext(AppContext);

  const { view } = router.query;

  const eyeDimensions = {
    width: `${eyeLidsWidthSimple}px`,
    height: `${eyeLidsHeight}px`,
  };

  const setEyeBallPosition = useCallback(function (event = {}) {
    const { innerWidth, innerHeight } = window;
    const { clientX = innerWidth / 2, clientY = innerHeight / 2 } = event;
    const { current: cursorFollowerElement } = refCursorFollower;
    const percentPositionX = (clientX * 100) / innerWidth;
    const percentPositionY = (clientY * 100) / innerHeight;
    cursorFollowerElement.style.top = `${percentPositionY}%`;
    cursorFollowerElement.style.left = `${percentPositionX}%`;
  });

  const parsedEyeBlinkTime = getParsedCssTime(styles.eyeBlinkTime);
  const isHoverShrinking = useSlowGrowingStarDelay();

  useEffect(() => {
    if (!isEyeTripping) {
      const { min, max } =
        cursorFollowingTime[isFollowingCursorMovement ? "active" : "passive"];
      const { current: cursorFollowerElement } = refCursorFollower;
      setTimeout(() => {
        setCursorFollowingMode(!isFollowingCursorMovement);
        cursorFollowerElement.classList[
          isFollowingCursorMovement ? "add" : "remove"
        ](styles.isStalled);
      }, getRandomAmount(min, max));
    } else {
      setCursorFollowingMode(false);
      setEyeBallPosition();
    }
  }, [isFollowingCursorMovement, isEyeTripping]);

  useEffect(() => {
    setCursorFollowingMode(!isEyeTripping);
  }, [isEyeTripping]);

  useEffect(() => {
    const eventName = "mousemove";
    const removeCursorTrackerEvent = () =>
      document.removeEventListener(eventName, setEyeBallPosition);

    if (isFollowingCursorMovement) {
      document.addEventListener(eventName, setEyeBallPosition);
    } else {
      removeCursorTrackerEvent();
      setEyeBallPosition();
    }

    return () => removeCursorTrackerEvent();
  }, [isFollowingCursorMovement]);

  // Hide the eye when it is closed:
  useEffect(() => {
    if (isEyeClosed) {
      const timerId = setTimeout(() => {
        setEyeHiddenState(!!view);
      }, parsedEyeBlinkTime);

      return () => {
        clearTimeout(timerId);
      };
    } else if (componentDidMount && !view) {
      setEyeHiddenState(false);
    }
  }, [isEyeClosed, view]);

  // Making sure the eye opening animation is in sync with its hidden state:
  useEffect(() => {
    const timerId = setTimeout(() => {
      setEyeClosed(isEyeHidden);
    }, parsedEyeBlinkTime);

    return () => {
      clearTimeout(timerId);
    };
  }, [isEyeHidden]);

  useEffect(() => {
    // Imitate componentDidMount life cycle of old-school class components:
    setComponentDidMount(true);

    // Hide the eye initially if content is displayed:
    setEyeHiddenState(!!view);
  }, []);

  return (
    <EyeContext.Provider
      value={{
        eyeLidsClass: styles.eyeLids,
        crossShapedClass: styles.eyeLidsCross,
        simpleShapedClass: styles.eyeLidsSimple,
      }}
    >
      <button
        onMouseOver={() => setEyeClosed(true)}
        onMouseLeave={() => setEyeClosed(false)}
        disabled={!!view}
        onClick={() => {
          setLastDropTriggerTime(new Date());
        }}
        className={classNames(styles.wrapper, styles[themeClassName], {
          [styles.isTripping]: isEyeTripping,
          [styles.isHoverShrinking]: isHoverShrinking,
          [styles.isHidden]: isEyeHidden,
          [styles.isViewShown]: !!view,
        })}
      >
        <div
          className={styles.eyeClip}
          style={{ width: `${eyeLidsWidthSimple}px` }}
        >
          <div className={styles.eye} style={eyeDimensions}>
            <div className={styles.eyeBallClip}>
              <div className={styles.eyeBallBoundary}>
                {/* The main eye ball */}
                <div
                  ref={refCursorFollower}
                  className={classNames(
                    styles.eyeBall,
                    styles.eyeBallCursorFollower,
                  )}
                >
                  {/* The outermost layer of the trippy eyes */}
                  <div className={classNames(styles.eye, styles.eyeInner)}>
                    {/* The middle eye ball */}
                    <div className={styles.eyeBall}>
                      <div className={styles.eye} style={eyeDimensions}>
                        {/* The innermost eye ball */}
                        <div
                          className={classNames(
                            styles.eyeBall,
                            styles.eyeBallInnermost,
                          )}
                        ></div>

                        {/* The innermost eye's blinking lids */}
                        <EyeLids shouldBlinkAutomatically />
                      </div>

                      {/* The inner part of the middle inner eye's blinking horizontal lids */}
                      <EyeLids animationDelay={parsedEyeBlinkTime} />
                    </div>

                    {/* The middle inner eye's non-blinking vertical lids */}
                    <EyeLids shouldNotBlinkAtAll />

                    {/* The outer part of the middle inner eye's blinking */}
                    {/* horizontal lids with a cut for the vertical eye */}
                    <EyeLids isCrossShape animationDelay={parsedEyeBlinkTime} />
                  </div>
                </div>
              </div>
            </div>

            {/* The main eye's blinking lids */}
            <EyeLids
              shouldBlinkOnClick
              shouldBlinkAutomatically={!isEyeTripping}
              shouldClose={isEyeClosed}
            />
          </div>
        </div>
      </button>
    </EyeContext.Provider>
  );
};

export default Eye;
