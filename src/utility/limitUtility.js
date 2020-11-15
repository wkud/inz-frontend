const spentPercent = (limit) =>
  Math.floor((limit.info.spent_amount / limit.planned_amount) * 100);

export { spentPercent };
