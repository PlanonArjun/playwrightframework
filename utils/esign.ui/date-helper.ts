const date = new Date();
const nextDate = new Date(date.getDate() + 1);

export const getDateMMDDYYYY = date.toLocaleDateString("en-us");
export const getNextDateMMDDYYYY = nextDate.toLocaleDateString("en-us");
