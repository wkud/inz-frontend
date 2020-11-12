const toIsoFormat = (date) => date.toJSON().slice(0, 10);
const toArray = (date) => [date.getFullYear(), date.getMonth(), date.getDate()];

const todayInIsoFormat = () => toIsoFormat(new Date());
const firstDayOfCurrentMonth = () => {
  const [y, m] = toArray(new Date());
  return toIsoFormat(new Date(y, m, 2));
};
const lastDayOfCurrentMonth = () => {
  const [y, m] = toArray(new Date());
  return toIsoFormat(new Date(y, m + 1, 1));
}; //TODO

export { todayInIsoFormat, firstDayOfCurrentMonth, lastDayOfCurrentMonth };
