const GeldautomaatSimulator = require("./GeldautomaatSimulator");

let geldautomaat;

beforeEach( () => {
    geldautomaat = new GeldautomaatSimulator();
})

test("Basic Path", () => {
    let antwoord;

    antwoord = geldautomaat.voerKaartIn(12346);
    expect(antwoord).toBe("Welkom! Voer uw pincode in aub");

    antwoord = geldautomaat.controleerPincode(6432);
    expect(antwoord).toBe("Maak uw keuze uit het menu aub");

    antwoord = geldautomaat.saldoOpvragen();
    expect(antwoord).toBe("Ziehier uw saldo. Verderdoen of Stop?");

    antwoord = geldautomaat.stoppen();
    expect(antwoord).toBe("Bedankt. Neem uw kaart terug aub");
})

test("Verkeerde of vervallen kaart", () => {
    let antwoord;

    antwoord = geldautomaat.voerKaartIn(12344);
    expect(antwoord).toBe("Sorry, deze kaart is niet bruikbaar. Neem ze terug aub");
})

test("Gestolen bankkaart", () => {
    let antwoord;

    antwoord = geldautomaat.voerKaartIn(12348);
    expect(antwoord).toBe("Sorry, uw bankkaart is ongeldig en werd ingeslikt");
})

test("Foute pincode 2x en 3x", () => {
    let antwoord;

    antwoord = geldautomaat.voerKaartIn(12345);
    expect(antwoord).toBe("Welkom! Voer uw pincode in aub");

    antwoord = geldautomaat.controleerPincode(1111);
    expect(antwoord).toBe("Pincode niet correct. Probeer opnieuw aub");

    antwoord = geldautomaat.controleerPincode(2222);
    expect(antwoord).toBe("Pincode niet correct. Probeer opnieuw aub");

    antwoord = geldautomaat.controleerPincode(3333);
    expect(antwoord).toBe("Sorry, teveel foute pincodes. Uw bankkaart werd ingeslikt");
})

test("Rekeninghouder kiest: Verder", () => {
    let antwoord;

    antwoord = geldautomaat.voerKaartIn(12346);
    expect(antwoord).toBe("Welkom! Voer uw pincode in aub");

    antwoord = geldautomaat.controleerPincode(6432);
    expect(antwoord).toBe("Maak uw keuze uit het menu aub");

    antwoord = geldautomaat.saldoOpvragen();
    expect(antwoord).toBe("Ziehier uw saldo. Verderdoen of Stop?");

    antwoord = geldautomaat.verdergaan();
    expect(antwoord).toBe("Maak uw keuze uit het menu aub");
})
