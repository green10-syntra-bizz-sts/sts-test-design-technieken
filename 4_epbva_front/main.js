const {handleBerekenPrijs, handleLeeftijdInput} =require("./domController.js");

const form = document.getElementById("bereken-prijs-obv-leeftijd-form");
form.addEventListener("submit", handleBerekenPrijs);

const itemInput = document.querySelector(`input[id="leeftijd-field"]`);
itemInput.addEventListener("input", handleLeeftijdInput);
