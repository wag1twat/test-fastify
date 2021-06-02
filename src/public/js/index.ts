const moment = require("moment");

(function () {
  const element = document.getElementById("h3-date");

  element.innerText = moment(Date.now()).format("DD-MM-YYYY, hh:mm:ss");

  setInterval(() => {
    element.innerText = moment(Date.now()).format("DD-MM-YYYY, hh:mm:ss");
  }, 1000);
})();
