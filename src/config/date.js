module.exports = function date() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours() - 4;
  let minutes = date.getMinutes();

  let dayString = JSON.stringify(day);
  let monthString = JSON.stringify(month);

  let dateCurrent = "";

  if (dayString.length === 1 && monthString.length === 1) {
    dateCurrent = `0${day}/0${month}/${year} ${hour}:${minutes}`;
  } else if (dayString.length === 1) {
    dateCurrent = `0${day}/${month}/${year} ${hour}:${minutes}`;
  } else if (monthString.length === 1) {
    dateCurrent = `${day}/0${month}/${year} ${hour}:${minutes}`;
  } else {
    dateCurrent = `${day}/${month}/${year} ${hour}:${minutes}`;
  }

  return dateCurrent;
};
