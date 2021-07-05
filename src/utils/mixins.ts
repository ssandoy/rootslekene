const size = {
  PHONE: "599px",
  // todo assert
  TABLET_PORTRAIT_UP: "768px",
};

export const device = {
  FOR_PHONE_ONLY: `(max-width: ${size.PHONE})`,
  FOR_TABLET_PORTRAIT_UP: `(min-width: ${size.TABLET_PORTRAIT_UP})`,
};
