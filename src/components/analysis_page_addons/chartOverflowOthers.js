const chartOverflowOthers = (maxLength, list, getValue, createItem) => {
  console.log(list);
  if (list.length <= maxLength) return list;

  const forbiddenItems = list.slice(maxLength - 1);
  console.log(forbiddenItems);
  const overflowItem = createItem(
    'other',
    forbiddenItems
      .map((item) => getValue(item))
      .reduce((currentSum, currentValue) => currentSum + currentValue)
  );

  const allowedItems = list.slice(0, maxLength - 1);
  console.log(allowedItems);
  console.log([...allowedItems, overflowItem]);
  return [...allowedItems, overflowItem];
};

export default chartOverflowOthers;
