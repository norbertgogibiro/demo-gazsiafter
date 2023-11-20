import React from "react";
import PropTypes from "prop-types";
import AnimationKeyframe from "./_SvgAnimationKeyframe";

// IMPORTANT! This component should ONLY be used as a child of an <path> element in an SVG wrapper
const SvgPathAnimation = (props) => {
  const {
    fillMode,
    duration,
    delay = 0,
    coordinatesStart,
    coordinatesEnd,
    repeatCount = "indefinite",
    isEaseInOut = true,
    restart = "whenNotActive",
    keyframes = [
      new AnimationKeyframe("start", 0),
      new AnimationKeyframe("end", 0.5),
      new AnimationKeyframe("start", 1),
    ],
  } = props;

  const keyframeCoordinates = {
    start: coordinatesStart,
    end: coordinatesEnd,
  };

  const finalKeyframeOrder = keyframes.map(
    ({ keyframeName }) => keyframeCoordinates[keyframeName]
  );

  const attributes = {
    attributeName: "d",
    dur: `${duration}ms`,
    repeatCount,
    restart,
    from: coordinatesStart,
    to: coordinatesEnd,
    begin: `${delay}ms`,
    values: finalKeyframeOrder.join(";"),
    keyTimes: keyframes.map(({ keyframeTime }) => keyframeTime).join("; "),
    fill: fillMode,
  };

  if (isEaseInOut) {
    const cubicBezierValues = "0.25, 0.1, 0.25, 1";
    attributes.calcMode = "spline";
    attributes.keySplines = new Array(finalKeyframeOrder.length - 1)
      .fill(cubicBezierValues)
      .join(";");
  }

  return <animate {...attributes} />;
};

SvgPathAnimation.propTypes = {
  duration: PropTypes.number.isRequired,
  delay: PropTypes.number,
  coordinatesStart: PropTypes.string.isRequired,
  coordinatesEnd: PropTypes.string.isRequired,
  keyframes: PropTypes.arrayOf(PropTypes.instanceOf(AnimationKeyframe)),
  repeatCount: PropTypes.string,
  restart: PropTypes.oneOf(["always", "whenNotActive", "never"]),
  fillMode: PropTypes.oneOf(["freeze", "remove"]),
  isEaseInOut: PropTypes.bool,
};

export default SvgPathAnimation;
