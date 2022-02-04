(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class ZwembadKassa {
    /**
     * berekent de toegangsprijs in functie van de leeftijd
     * @param leeftijd de leeftijd in jaren - moet een geheel getal zijn
     * @return de te betalen toegangsprijs in EUR
     */
    berekenPrijs(leeftijd) {

        if (leeftijd < 0) throw(new Error('Leeftijd moet minimaal nul zijn'))

        let prijs;

        if (leeftijd <= 6) prijs = 1.00;
        else if (leeftijd <= 16) prijs = 2.00;
             else if (leeftijd <= 65) prijs = 2.50;
                  else prijs = 1.50;

        return prijs;
    }
    geefSoortTarief(leeftijd) {
        if (leeftijd==6 || leeftijd==16 || leeftijd==66) return "kortingsgrens";
        if (leeftijd>16 && leeftijd<66) return "maximum"
            else return "korting";
    }
}

module.exports = {ZwembadKassa}

},{}],2:[function(require,module,exports){
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
    // TODO zodra er een cijfer staat knop deblokkeren, tenzij er een vreemd teken komt, dan knop terug blokkeren
    giveFeedback("U voert een leeftijd in. Klik op de knop als u klaar bent", "gewoon");
}

module.exports = { handleBerekenPrijs, handleLeeftijdInput }

},{"./ZwembadKassa.js":1}],3:[function(require,module,exports){
const {handleBerekenPrijs, handleLeeftijdInput} =require("./domController.js");

const form = document.getElementById("bereken-prijs-obv-leeftijd-form");
form.addEventListener("submit", handleBerekenPrijs);

const itemInput = document.querySelector(`input[id="leeftijd-field"]`);
itemInput.addEventListener("input", handleLeeftijdInput);

},{"./domController.js":2}]},{},[3]);
