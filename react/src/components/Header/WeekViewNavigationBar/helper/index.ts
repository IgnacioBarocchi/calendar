export interface WeekNavigationBarProps {
  gridArea: string;
  month: string;
  year: number;
  shouldDisplayLogo: boolean;
}

export const shouldWeekViewNavigationBarPreventRender = (
  oldProps: WeekNavigationBarProps,
  nextProps: WeekNavigationBarProps,
) => {
  const monthsAreEqual = oldProps.month === nextProps.month;
  const yearsAreEqual = oldProps.year === nextProps.year;
  const logoLayoutDidNotChange =
    oldProps.shouldDisplayLogo === nextProps.shouldDisplayLogo;
  return monthsAreEqual && yearsAreEqual && logoLayoutDidNotChange;
};
