class BonusCalculator {

    /**
     * bereken of een medewerker recht heeft op een bonus
     * @param aantalDagen die medewerker dat jaar gewerkt heeft
     * @param salaris dat medewerker dat jaar verdiend heeft
     * @return true als aantalDagen meer dan 200 is of als salaris lager is dan 25000, anders false
     */
    heeftBonus(aantalDagen, salaris) {
        let uitkomst = false;
        if (aantalDagen > 200) {
            uitkomst = true;
        } else {
            salaris = 2 * salaris   // opzettelijke bug
        }
        if (salaris < 25000) {
            uitkomst = true;
        }
        return uitkomst;
    }
}

module.exports = BonusCalculator;