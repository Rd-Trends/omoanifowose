
// ** return time in correct format
  const normalizetimeParameter = (param) => {
    return param < 10 ? `0${param}` : param;
  };

// ** convert seconds and display in hour, minute and seconds
 export const displayTime = (time) => {
  if (isNaN(time)) {
    return `00 : 00`;
  }

  let hour = Math.floor(time / 3600);
  let minute = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  return hour > 0
    ? `${normalizetimeParameter(hour)} : ${normalizetimeParameter(
        minute
      )} : ${normalizetimeParameter(seconds)}`
    : ` ${normalizetimeParameter(minute)} : ${normalizetimeParameter(seconds)}`;
};
