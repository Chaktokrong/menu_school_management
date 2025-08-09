export const formatNumbertoLocaleString = (number) => {
  let Number = parseFloat(number || 0);
  return Number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
