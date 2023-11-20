export const getRandomAmount = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getShuffledArray = (inputArray) => {
  // https://stackoverflow.com/a/2450976/5125537
  const outputArray = [...inputArray];
  let { length: counter } = outputArray;
  let temp;
  let index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter -= 1;
    temp = outputArray[counter];
    outputArray[counter] = outputArray[index];
    outputArray[index] = temp;
  }

  return outputArray;
};

const cssTimeInSecondsRegex = /^\d*(\.(\d+))?s$/;
export const getParsedCssTime = (cssTimeString) => {
  const isTimeInSeconds = cssTimeInSecondsRegex.test(cssTimeString);
  return parseFloat(cssTimeString) * (isTimeInSeconds ? 1000 : 1);
};

export const getParsedCssPixelsSize = (cssPixelsSizeString) => {
  return parseInt(cssPixelsSizeString.replace("px"));
};
