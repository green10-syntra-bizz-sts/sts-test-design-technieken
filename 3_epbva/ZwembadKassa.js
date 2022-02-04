class ZwembadKassa {
    /**
     * berekent de toegangsprijs in functie van de leeftijd
     * @param leeftijd de leeftijd in jaren
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
}

module.exports = ZwembadKassa