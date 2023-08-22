export const formatDateToHuman = (inputDate: string) => {
  const dateObj = new Date(inputDate);
  const formatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
  return formatter.format(dateObj);
};

export const formatDateToServer = (inputDate: string) => {
  const dateObj = new Date(inputDate);
  return dateObj.toISOString().slice(0, 10);
};

export const getStyleForNavLink = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? {
      cursor: 'default',
    }
    : {
      cursor: 'pointer',
    };

export const getRandomValueFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const getRandomUniqueValuesFromArray = <T>(arr: T[], number: number): T[] => {
  if (arr.length <= number) {
    return arr;
  }

  const shuffled = arr.slice();
  const result: T[] = [];

  while (result.length < number) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    const value = shuffled[randomIndex];

    if (!result.includes(value)) {
      result.push(value);
    }
  }

  return result;
};
