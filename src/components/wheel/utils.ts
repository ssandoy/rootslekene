export const getRotationDegrees = (
  prizeNumber: number,
  numberOfPrizes: number
) => {
  const degreesPerPrize = 360 / numberOfPrizes;

  // 270 makes rotation stop at the bottom
  const initialRotation = 270 + degreesPerPrize / 2;

  const randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;

  const prizeRotation =
    degreesPerPrize * (numberOfPrizes - prizeNumber) -
    initialRotation +
    randomDifference;

  return prizeRotation;
};

export const clamp = (min: number, max: number, val: number) =>
  Math.min(Math.max(min, +val), max);
