export const generateApplicationNumber = () => {
  let date = new Date();
  let res = "ICICI_";
  res += date.getFullYear();
  res += date.getMonth();
  res += date.getDate();
  res += date.getHours();
  res += date.getMinutes();
  res += date.getSeconds();
  res += date.getMilliseconds();
  return res;
};
