export const InvalidParamsError = (body: any) => {
  return {
    code: "INVALID_PARAMS",
    message: "Invalid params",
    body,
  };
};

export const NoSuchFileError = (source: string) => {
  return {
    code: "NO_SUCH",
    message: `ENOENT: no such file or directory, open '${source}'`,
  };
};

export const SomethingError = () => {
  return {
    code: "SOMETHING",
    message: "Something wrong",
  };
};
