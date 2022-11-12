export const dateFormat = (date: string) => {
  return new Intl.DateTimeFormat('ru-RU').format(new Date(date));
};

export const getYear = (date: string) => {
  return new Date(date).getFullYear();
};

export const currencyFormat = (currency: number) => {
  return new Intl.NumberFormat('en-En', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(currency);
};

export const runtimeFormat = (time: number) => {
  const hours = Math.trunc(time / 60);
  const minuts = time - hours * 60;
  return `${hours}h ${minuts}min`;
};
