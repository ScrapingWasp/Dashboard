export const dollarsToCredits = (dollars) => {
  if (dollars <= 29) {
    return dollars / (29 / 250000);
  } else if (dollars <= 99) {
    return dollars / (99 / 1500000);
  } else {
    return dollars / (259 / 4000000);
  }
};

export const creditsToDollars = (credits) => {
  if (credits <= 250000) {
    return credits * (29 / 250000);
  } else if (credits <= 1500000) {
    return credits * (99 / 1500000);
  } else {
    return credits * (259 / 4000000);
  }
};
