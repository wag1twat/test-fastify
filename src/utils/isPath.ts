export const isPath = (path: string) => {
  return new RegExp(/^((\/){1}[a-zA-Z0-9_-]+)+$/g).test(path);
};
