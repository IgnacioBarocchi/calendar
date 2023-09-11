const getW = () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  var weekNumber = Math.ceil(days / 7);

  console.log("Week number of " + currentDate + " is : " + weekNumber);

  // friday
  console.log("Week starts on " + days);
};
