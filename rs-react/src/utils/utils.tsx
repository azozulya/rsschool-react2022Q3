export const dateFormat = (date: string) => {
  return new Intl.DateTimeFormat('ru-RU').format(new Date(date));
};

export const getYear = (date: string) => {
  return new Date(date).getFullYear();
};
