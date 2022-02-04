const fs = require("fs");

const initialHtml = fs.readFileSync(__dirname + "/index.html", "utf8");

beforeEach(() => {
    document.body.innerHTML = initialHtml;
    jest.resetModules();                        // Elke test krijgt een verse DOM
    require("./main");                          // main.js om de listeners te activeren
});

const {screen, getByText} = require("@testing-library/dom");

const jestDom = require("@testing-library/jest-dom");    // Extra elegante expect-functies
expect.extend(jestDom);

// Helper voor volgende test cases
function vulLeeftijdInCheckResultaat (leeftijd, verwachtResultaat, verwachteKleur) {
    screen.getByPlaceholderText("jaren").value = leeftijd.toString();
    const event = new Event("submit");
    const form = document.getElementById("bereken-prijs-obv-leeftijd-form");
    form.dispatchEvent(event);
    let feedback = document.getElementById("kassa-feedback");
    expect(getByText(feedback, verwachtResultaat)).toBeInTheDocument();
    expect(getByText(feedback, verwachtResultaat)).toHaveStyle({color: verwachteKleur});
}

test("Gewone prijsberekening zonder korting", () => {
    vulLeeftijdInCheckResultaat(57,
        "Voor een leeftijd van 57 jaar is de prijs 2.50 EUR",
        "green");
});

test("Gewone prijsberekening met korting", () => {
    vulLeeftijdInCheckResultaat(75,
        "Voor een leeftijd van 75 jaar is de prijs 1.50 EUR",
        "orange");
});

test("Gewone prijsberekening met korting op leeftijdsgrens", () => {
    vulLeeftijdInCheckResultaat(66,
        "Voor een leeftijd van 66 jaar is de prijs 1.50 EUR",
        "red");
});

test("Negatieve leeftijd", () => {
    vulLeeftijdInCheckResultaat(-7,
        "Leeftijd moet minimaal nul zijn",
        "mediumpurple");
});

test("Leeftijd is kommagetal", () => {
    vulLeeftijdInCheckResultaat(16.5,
        "Voor een leeftijd van 16 jaar is de prijs 2.00 EUR",
        "red");
});

test("Leeftijd is geen getal", () => {
    vulLeeftijdInCheckResultaat("Erg jong",
        '"Erg jong" is geen goede input! Geef een geheel getal in aub.',
        "mediumpurple");
});

