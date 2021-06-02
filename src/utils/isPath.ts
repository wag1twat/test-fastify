// no such empty file name /((\/)[a-zA-Z0-9\s_@\-^!#$%&+={}\[\]]+)+\.?[a-zA-Z]+$/g

export const isPath = (path: string) => {
  return new RegExp(
    /((\/)[a-zA-Z0-9\s_@\-^!#$%&+={}\[\]]+)+\/[_a-zA-Z0-9\s\].?[a-zA-Z0-9]+$/g
  ).test(path);
};
