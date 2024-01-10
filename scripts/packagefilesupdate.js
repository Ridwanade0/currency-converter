const fs = require("fs");
const axios = require("axios");
const appId = "b010664484b3488e8998f0fac8169401";

function ratesAPICall() {
  axios
    .get("https://openexchangerates.org/api/latest.json", {
      params: {
        app_id: appId,
      },
    })
    .then((response) => {
      fs.writeFileSync(
        "../packages/rates.json",
        JSON.stringify(response.data.rates, null, 2)
      );
      console.log("File saved successfully!");
    })
    .catch((error) => {
      console.error("Error making API request:", error);
    });
}

setInterval(ratesAPICall, 86400000)
