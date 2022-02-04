class ZwembadKassa {
    /**
     * Bereken de toegangsprijs in functie van de leeftijd
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

    /**
     * Bepaal het soort toegekende tarief
     * @param leeftijd
     * @return {string} dat het soort tarief typeert
     */
    geefSoortTarief(leeftijd) {
        if (leeftijd==6 || leeftijd==16 || leeftijd==66) return "kortingsgrens";
        if (leeftijd>16 && leeftijd<66) return "maximum"
            else return "korting";
    }
}

module.exports = {ZwembadKassa}
