const size = {
  PHONE: "599px",
  // todo assert
  TABLET: "800px",
};

export const device = {
  FOR_PHONE_ONLY: `(max-width: ${size.PHONE})`,
  FOR_TABLET_PORTRAIT_UP: `(min-width: ${size.TABLET})`,
  FOR_TABLET_PORTRAIT_DOWN: `(max-width: ${size.TABLET})`,
};
