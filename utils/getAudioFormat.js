export const getAudioFormat = (url) => {
  let arr = url.split(".");
  return arr[arr.length - 1];
};
