const baseCurrency = document.getElementById("baseCurrency");
const targetCurrency = document.getElementById("targetCurrency");

function update_dropdownlist() {
  fetch("../packages/currencySymbols.json")
    .then((response) => response.json())
    .then((currencySymbols) => {
      const select = document.querySelectorAll(".currencySelector");

      select.forEach((element) => {
        element.innerHTML = "";

        const currencySymbolsArray = Object.entries(currencySymbols);
        const currencySymbolsArrayKeys = Object.keys(currencySymbols);
        const currencySymbolsArrayvalues = Object.values(currencySymbols);

        for (let i = 0; i < currencySymbolsArray.length; i++) {
          const selectOptions = document.createElement("option");
          selectOptions.setAttribute("value", currencySymbolsArrayKeys[i]);
          selectOptions.innerHTML = currencySymbolsArrayvalues[i];

          element.appendChild(selectOptions);
        }
      });
    });
}

function apiCall() {
  const appId = "b010664484b3488e8998f0fac8169401";

  $.get(
    "https://openexchangerates.org/api/latest.json",
    { app_id: appId },
    function (data) {
      currencyKeys = Object.keys(data.rates);
      currencyValues = Object.values(data.rates);
      console.log(currencyKeys.length);
      // console.log(currencyValues);
    }
  );
}

function register_function() {
  apiCall();
  console.log("appi call successfull... ");
  console.log(currencyKeys);

  // call drow down list update
  update_dropdownlist();
  console.log("update complete");

  computer;
}

document.addEventListener("DOMContentLoaded", register_function);
