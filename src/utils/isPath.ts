export const isPath = (path: string) => {
  return new RegExp(
    /((\/)[a-zA-Z0-9\s_@\-^!#$%&+={}\[\]]+)+\.?[a-zA-Z]+$/g
  ).test(path);
};
