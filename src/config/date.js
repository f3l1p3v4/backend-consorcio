module.exports = function date() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let dayString = JSON.stringify(month);
  let monthString = JSON.stringify(month);

  let dateCurrent = "";

  if (dayString.length === 1 && monthString.length === 1) {
    dateCurrent = `0${day}0${month}${year}`;
  } else if (dayString.length === 1) {
    dateCurrent = `0${day}${month}${year}`;
  } else if (monthString.length === 1) {
    dateCurrent = `${day}0${month}${year}`;
  } else {
    dateCurrent = `${day}${month}${year}`;
  }

  return dateCurrent;
};
