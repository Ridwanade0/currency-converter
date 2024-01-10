const baseCurrency = document.getElementById("baseCurrency");
const targetCurrency = document.getElementById("targetCurrency");
const convertBTN = document.getElementById("convertCurrencyBTN");
const targetCurrencyAmountValue = document.getElementById("targetCurrencyAmount");
function currencySelector() {
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

function currencyRates() {
  fetch("../packages/rates.json")
    .then((response) => response.json())
    .then((currencyExchangeRate) => {
      // conversion logic
      const amountToConvert = parseFloat(
        document.getElementById("baseCurrencyAmount").value
      );

      let baseExchangeRate = currencyExchangeRate[baseCurrency.value];
      let targetExchangeRate = currencyExchangeRate[targetCurrency.value];

      const amountInUSD = amountToConvert / baseExchangeRate;
      const targetCurrencyAmount = amountInUSD * targetExchangeRate;

      targetCurrencyAmountValue.innerHTML = `${targetCurrencyAmount.toFixed(2)} `

    });
}

let scriptLoad = () => {
  currencySelector();
};
convertBTN.addEventListener("click", currencyRates);
document.addEventListener("DOMContentLoaded", scriptLoad);
