const ZwembadKassa = require("./ZwembadKassa.js");

let zwembadKassa;

beforeAll( () => {
    zwembadKassa = new ZwembadKassa();
})

// helper function
function expectThrowsMinimaal0(leeftijd) {
    try {
        zwembadKassa.berekenPrijs(leeftijd);
    } catch (err) {
        expect(err.message).toBe("Leeftijd moet minimaal nul zijn");
    }
}

test ("Negatieve leeftijd", () => {
    expect.assertions(2);
    expectThrowsMinimaal0(-5); // EP
    expectThrowsMinimaal0(-1); // BVA
})

test ("Leeftijd tussen 0 en 6 inbegrepen", () => {
    expect(zwembadKassa.berekenPrijs(0)).toEqual(1.00); // BVA
    expect(zwembadKassa.berekenPrijs(1)).toEqual(1.00); // BVA
    expect(zwembadKassa.berekenPrijs(3)).toEqual(1.00); // EP
    expect(zwembadKassa.berekenPrijs(5)).toEqual(1.00); // BVA
    expect(zwembadKassa.berekenPrijs(6)).toEqual(1.00); // BVA
})

test ("Leeftijd tussen 7 en 16 inbegrepen", () => {
    expect(zwembadKassa.berekenPrijs(7)).toEqual(2.00); // BVA
    expect(zwembadKassa.berekenPrijs(10)).toEqual(2.00); // EP
    expect(zwembadKassa.berekenPrijs(16)).toEqual(2.00); // BVA
})

test ("Leeftijd tussen 17 en 65 inbegrepen", () => {
    expect(zwembadKassa.berekenPrijs(17)).toEqual(2.50); // BVA
    expect(zwembadKassa.berekenPrijs(53)).toEqual(2.50); // EP
    expect(zwembadKassa.berekenPrijs(65)).toEqual(2.50); // BVA
})

test ("Leeftijd 66 en ouder", () => {
    expect(zwembadKassa.berekenPrijs(66)).toEqual(1.50); // BVA
    expect(zwembadKassa.berekenPrijs(75)).toEqual(1.50); // EP
    expect(zwembadKassa.berekenPrijs(99)).toEqual(1.50); // BVA
})
