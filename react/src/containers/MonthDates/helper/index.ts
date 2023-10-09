export const shouldMonthDatesPreventRender = (
  prevProps: { monthDates: Date[] },
  nextProps: { monthDates: Date[] },
) => {
  if (!prevProps.monthDates || !nextProps.monthDates) return false;

  const monthDatesDidNotChange =
    prevProps.monthDates[0].toDateString() ===
    nextProps.monthDates[0].toDateString();

  return monthDatesDidNotChange;
};
