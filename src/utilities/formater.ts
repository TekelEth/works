export const formatAmount = (value: string | number) => {
  if (isNaN(Number(value))) return '';
  const result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return result;
};
