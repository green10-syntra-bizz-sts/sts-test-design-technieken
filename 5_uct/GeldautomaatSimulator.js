class GeldautomaatSimulator {

    geldigeBankkaartnummers = [12345, 12346, 12347];
    pincodes = [5432, 6432, 7432];
    vervallenBankkaartnummer = 12344;
    gestolenBankkaartnummer = 12348;

    ingevoerdeBankkaartIndex = -1;
    foutePinpogingen = 0;

    /**
     * Bankkaart invoeren
     * @param bankkaartnummer het nummer van de ingevoerde bankpas
     * @return Verzoek pincode in te voeren voor bekende kaart, anders Onbekende/vervallen of gestolen bankkaart
     */
    voerKaartIn(bankkaartnummer) {
        this.ingevoerdeBankkaartIndex = this.geldigeBankkaartnummers.indexOf(bankkaartnummer);
        if (this.ingevoerdeBankkaartIndex != -1) {
            return ("Welkom! Voer uw pincode in aub");
        } else {
            if (bankkaartnummer == this.vervallenBankkaartnummer)
                return ("Sorry, deze kaart is niet bruikbaar. Neem ze terug aub");
            else if (bankkaartnummer == this.gestolenBankkaartnummer)
                return ("Sorry, uw bankkaart is ongeldig en werd ingeslikt");
            else return ("Deze situatie is niet voorzien in de simulator")
        }
    }

    /**
     * Pincode controleren
     * @param pincode de te controleren pincode
     * @return melding Maak uw Keuze indien ok, anders een gepaste boodschap
     */
    controleerPincode(pincode) {
        if (pincode == this.pincodes[this.ingevoerdeBankkaartIndex]) {
            return ("Maak uw keuze uit het menu aub");
        } else {
            this.foutePinpogingen++;
            if (this.foutePinpogingen < 3) {
                return ("Pincode niet correct. Probeer opnieuw aub");
            } else {
                return ("Sorry, teveel foute pincodes. Uw bankkaart werd ingeslikt");
            }
        }
    }

    saldoOpvragen() {
        return ("Ziehier uw saldo. Verderdoen of Stop?");
    }

    stoppen() {
        return ("Bedankt. Neem uw kaart terug aub");
    }

    verdergaan() {
        return ("Maak uw keuze uit het menu aub");
    }
}

module.exports = GeldautomaatSimulator;
