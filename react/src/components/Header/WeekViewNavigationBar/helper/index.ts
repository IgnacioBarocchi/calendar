export interface WeekNavigationBarProps {
  gridArea: string;
  month: string;
  year: number;
  shouldDisplayLogo: boolean;
  experimentalFeatures: boolean;
  mapDispatchToProps: () => void;
}

export const shouldWeekViewNavigationBarPreventRender = (
  oldProps: WeekNavigationBarProps,
  nextProps: WeekNavigationBarProps,
) => {
  const monthsAreEqual = oldProps.month === nextProps.month;
  const yearsAreEqual = oldProps.year === nextProps.year;
  const logoLayoutDidNotChange =
    oldProps.shouldDisplayLogo === nextProps.shouldDisplayLogo;
  const experimentsDidNotChange =
    oldProps.experimentalFeatures === nextProps.experimentalFeatures;

  return (
    monthsAreEqual &&
    yearsAreEqual &&
    logoLayoutDidNotChange &&
    experimentsDidNotChange
  );
};
