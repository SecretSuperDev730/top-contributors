export const wait = (msecs = 100) => {
  return new Promise((resolve) => setTimeout(resolve, msecs));
};
