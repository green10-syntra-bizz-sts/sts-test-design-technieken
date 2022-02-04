const {ZwembadKassa} = require("./ZwembadKassa.js");

let zwembadKassa = new ZwembadKassa();

function giveFeedback(fbstr, soort) {
    let fb = window.document.getElementById("kassa-feedback");
    fb.innerHTML = fbstr;
    fb.className = soort;
}

const handleBerekenPrijs = (event) => {
    let soort = "fout";
    event.preventDefault();
    const {leeftijdInput} = event.target.elements;
    const leeftijd = parseInt(leeftijdInput.value);
    let resultaat;
    if (Number.isInteger(leeftijd) ) {
        try {
            resultaat = "Voor een leeftijd van " + leeftijd + " jaar is de prijs "
                + zwembadKassa.berekenPrijs(leeftijd).toFixed(2) + " EUR"
            soort = zwembadKassa.geefSoortTarief(leeftijd);
        } catch (e) {
            resultaat = e.message;
        }
    } else {
        resultaat = '"'+leeftijdInput.value+'"' + " is geen goede input! Geef een geheel getal in aub."
    }
    giveFeedback(resultaat, soort);
};

const handleLeeftijdInput = (event) => {
    event.preventDefault();
    giveFeedback("U voert een leeftijd in. Klik op de knop als u klaar bent", "gewoon");
}

module.exports = { handleBerekenPrijs, handleLeeftijdInput }
