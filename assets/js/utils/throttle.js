const throttle = (callback, time) => {
  let throttleTimeout = false;
  return function(...args) {
    if (!throttleTimeout) {
      callback.apply(this, args);
      throttleTimeout = true;
      setTimeout(() => {
        throttleTimeout = false;
      }, time);
    }
  };
};
export default throttle;