const BonusCalculator = require("./BonusCalculator.js");
let bonusCalculator;

beforeAll( () => {
    bonusCalculator = new BonusCalculator();
} )

test("De heeftBonus methode kan een bonus adviseren " +
    "bij voldoende gewerkte dagen en een laag salaris", () => {

    expect(bonusCalculator.heeftBonus(250, 20000)).toEqual(true);
} )

test("De heeftBonus methode kan geen bonus adviseren " +
    "bij onvoldoende gewerkte dagen en een te hoog salaris", () => {

    expect(bonusCalculator.heeftBonus(190, 30000)).toEqual(false);
} )

test("De heeftBonus methode kan een bonus adviseren " +
    "bij voldoende gewerkte dagen maar een hoog salaris", () => {

    expect(bonusCalculator.heeftBonus(250, 30000)).toEqual(true);
} )

test("De heeftBonus methode kan een bonus adviseren " +
    "bij onvoldoende gewerkte dagen maar wel een laag salaris", () => {

    expect(bonusCalculator.heeftBonus(190, 20000)).toEqual(true);
} )



