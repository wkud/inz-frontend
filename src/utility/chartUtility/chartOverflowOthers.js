const chartOverflowOthers = (maxLength, list, getValue, createItem) => {
  if (list.length <= maxLength) return list;

  const forbiddenItems = list.slice(maxLength - 1);
  const overflowItem = createItem(
    'other',
    forbiddenItems
      .map((item) => getValue(item))
      .reduce((currentSum, currentValue) => currentSum + currentValue)
  );

  const allowedItems = list.slice(0, maxLength - 1);
  return [...allowedItems, overflowItem];
};

export default chartOverflowOthers;
