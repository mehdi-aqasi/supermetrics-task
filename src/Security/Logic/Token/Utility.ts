export const getNextHour = (time: number): number => {
  if (!time) {
    return 0;
  } else {
    let _time = new Date(time);
    return _time.setHours(_time.getHours() + 1);
  }
};
