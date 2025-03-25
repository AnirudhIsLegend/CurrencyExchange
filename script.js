const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const fromFlag = document.querySelector(".selectcontainer img");
const toFlag = document.querySelectorAll(".selectcontainer img")[1];
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const convertButton = document.getElementById("convert");


// Populate dropdowns dynamically
function populateCurrencyOptions() {
    for (const currency in countryList) {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    }
}

// Update flag when currency changes
function updateFlag(selectElement, flagElement) {
    const currencyCode = selectElement.value;
    const countryCode = countryList[currencyCode];
    flagElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Fetch exchange rates and convert
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = "Enter a valid amount";
        return;
    }

    const from = fromCurrency.value.toUpperCase();
    const to = toCurrency.value.toUpperCase();
    const apiUrl = `https://v6.exchangerate-api.com/v6/cfbf66bc594b036e6e5a03f9/latest/${from}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rate =data.conversion_rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`;
    } catch (error) {
        resultDiv.textContent = "Error fetching exchange rate";
    }
}

// Event listeners
fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, fromFlag));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toFlag));
convertButton.addEventListener("click", convertCurrency);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    populateCurrencyOptions();
    updateFlag(fromCurrency, fromFlag);
    updateFlag(toCurrency, toFlag);
});
