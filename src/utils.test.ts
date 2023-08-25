import {
  formatDateToHuman,
  formatDateToServer,
  getStyleForNavLink,
  getRandomValueFromArray,
  getRandomUniqueValuesFromArray,
} from './utils';

describe('Utility Functions', () => {
  it('should format date to human-readable format', () => {
    const formattedDate = formatDateToHuman('2023-08-24T12:34:56.789Z');
    expect(formattedDate).toBe('August 2023');
  });

  it('should format date to server-readable format', () => {
    const formattedDate = formatDateToServer('2023-08-24T12:34:56.789Z');
    expect(formattedDate).toBe('2023-08-24');
  });

  it('should return styles for active and inactive nav links', () => {
    const activeStyles = getStyleForNavLink({ isActive: true });
    const inactiveStyles = getStyleForNavLink({ isActive: false });

    expect(activeStyles).toEqual({ cursor: 'default' });
    expect(inactiveStyles).toEqual({ cursor: 'pointer' });
  });

  it('should get a random value from an array', () => {
    const arr = [1, 2, 3, 4, 5];
    const randomValue = getRandomValueFromArray(arr);
    expect(arr.includes(randomValue)).toBe(true);
  });

  it('should get random unique values from an array', () => {

    const arr = [1, 2, 3, 4, 5];
    const number = 3;
    const randomValues = getRandomUniqueValuesFromArray(arr, number);
    expect(randomValues.length).toBe(number);
    randomValues.forEach((value) => {
      expect(arr.includes(value)).toBe(true);
    });
  });
});
