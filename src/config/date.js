module.exports = function date() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let monthString = JSON.stringify(month);

  let dateCurrent = "";

  if (monthString.length === 1) {
    dateCurrent = `${day}/0${month}/${year}`;
  } else {
    dateCurrent = `${day}/${month}/${year}`;
  }

  return dateCurrent;
};
