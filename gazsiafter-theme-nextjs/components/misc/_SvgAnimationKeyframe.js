const AnimationKeyframe = function (keyframeName, keyframeTime) {
  const supportedKeyframeNames = ["start", "end"];

  if (!supportedKeyframeNames.includes(keyframeName)) {
    throw new Error(`Unexpected keyframe name "${keyframeName}"`);
  }

  this.keyframeName = keyframeName;
  this.keyframeTime = keyframeTime;
};

export default AnimationKeyframe;
