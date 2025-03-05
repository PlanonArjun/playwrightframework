export const getRandomSSN = (): string => {
  return `${Math.random().toString().slice(2, 10)}`;
};
