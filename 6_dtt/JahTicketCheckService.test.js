const jts = require("./JahTicketCheckService.js");
const JahTicketCheckService = jts.JahTicketCheckService;
const logger = jts.logger;

let jahTicketCheckService;

function ticketno_valid_range(ticketno) {
    // Geldige ticketnummers zijn 123456, 123457 en 123458
    return (ticketno >= 123456 && ticketno <= 123458);
}

function juiste_klant_no(klantno) {
    // Het bijhorende geldige klantnummer is 1234
    return (klantno === 1234)
}

/**
 * Functie die als mock zal fungeren voor de methode checkTicketExistence
 */
function mockedCheckTicketExistence(ticketno) {
    logger.info('checkTicketExistence called with ticketno '+ticketno);
    return ticketno_valid_range(ticketno);
}

/**
 * Functie die als mock zal dienst doen voor de methode checkTicket - eerste oproep
 */
function mockedCheckTicket1st(ticketno, klantno) {
    logger.info('checkTicket called with ticketno ' + ticketno + ' and klantno ' + klantno);
    if (!ticketno_valid_range(ticketno)) return "Onbekend ticketnummer";
    if (!juiste_klant_no(klantno)) return "Probeer opnieuw aub";
    else return "Ga verder met de reservatie"
}

/**
 * Functie die als mock zal dienst doen voor de methode checkTicket - tweede oproep
 */
function mockedCheckTicket2nd(ticketno, klantno) {
    logger.info('checkTicket called with ticketno ' + ticketno + ' and klantno ' + klantno);
    if (!ticketno_valid_range(ticketno)) return "Onbekend ticketnummer";
    if (!juiste_klant_no(klantno)) return "Probeer opnieuw aub";
    else return "Er is op dit ticket al gereserveerd"
}

/**
 * Functie die als mock zal dienst doen voor de methode checkTicket - derde en volgende oproep
 */
function mockedCheckTicketLater(ticketno, klantno) {
    logger.info('checkTicket called with ticketno ' + ticketno + ' and klantno ' + klantno);
    if (!ticketno_valid_range(ticketno)) return "Onbekend ticketnummer";
    if (!juiste_klant_no(klantno)) return "Ticketnummer werd geblokkeerd";
    else return "Er is op dit ticket al gereserveerd"
}

beforeEach( () => {
    jahTicketCheckService = new JahTicketCheckService();  // SoT - nog niet ontwikkelde lege klasse
    jest.spyOn(jahTicketCheckService, "checkTicketExistence")
        .mockImplementation(mockedCheckTicketExistence);  // Methode vervangen door mock functie
    jest.spyOn(jahTicketCheckService, "checkTicket")
        .mockImplementationOnce(mockedCheckTicket1st)  // Methode vervangen door mock functie 1ste oproep
        .mockImplementationOnce(mockedCheckTicket2nd)  // Methode vervangen door mock functie 2de oproep
        .mockImplementation(mockedCheckTicketLater);   // Methode vervangen door mock functie 3de en latere oproep
    jest.spyOn(logger,"info");
});

afterEach( () => {
    // De mocks onthouden hun status, dus moeten we die na elke test wissen
    jahTicketCheckService.checkTicketExistence.mockClear();
    jahTicketCheckService.checkTicket.mockClear();
    logger.info.mockClear();
});

describe("Enkele spy tests", () => {
    test ("CheckTicketExistence oproepen", () => {
        jahTicketCheckService.checkTicketExistence(123456);
        jahTicketCheckService.checkTicketExistence(123457);
        jahTicketCheckService.checkTicketExistence(123458);
        jahTicketCheckService.checkTicketExistence(123459);
        expect(jahTicketCheckService.checkTicketExistence.mock.calls).toHaveLength(4);
        expect(jahTicketCheckService.checkTicketExistence.mock.calls[0]).toEqual([123456]);
        expect(jahTicketCheckService.checkTicketExistence.mock.calls[3]).toEqual([123459]);
        expect(logger.info.mock.calls).toHaveLength(4);
        expect(logger.info.mock.calls[0]).toEqual(["checkTicketExistence called with ticketno 123456"]);
    });
    test ("CheckTicket oproepen", () => {
        jahTicketCheckService.checkTicket(123456, 2468);
        jahTicketCheckService.checkTicket(123456, 2469);
        jahTicketCheckService.checkTicket(123456, 2470);
        jahTicketCheckService.checkTicket(123459, 2468);
        jahTicketCheckService.checkTicket(123458, 1234);
        expect(jahTicketCheckService.checkTicket.mock.calls).toHaveLength(5);
        expect(jahTicketCheckService.checkTicket.mock.calls[0]).toEqual([123456, 2468]);
        expect(jahTicketCheckService.checkTicket.mock.calls[3]).toEqual([123459, 2468]);
        expect(logger.info.mock.calls).toHaveLength(5);
        expect(logger.info.mock.calls[0]).toEqual(["checkTicket called with ticketno 123456 and klantno 2468"]);
    });
});

/**
 * Pro forma vingeroefeningetje
 */
describe("CheckTicketExistence testen", () => {
    test ("CheckTicketExistence herkent een bestaand ticket", () => {
        let result = jahTicketCheckService.checkTicketExistence(123456);
        expect(result).toEqual(true);
    });
    test ("CheckTicketExistence herkent een niet bestaand ticket", () => {
        let result = jahTicketCheckService.checkTicketExistence(123459);
        expect(result).toEqual(false);
    });
});

/**
 * De concrete testgevallen in code uitgewerkt
 */
describe("CheckTicket testen", () => {
    test ("CheckTicket - ts16 ", () => {
        expect(jahTicketCheckService.checkTicket(123459, 2468)).toEqual("Onbekend ticketnummer")
    });
    test ("CheckTicket - ts8 ", () => {
        expect(jahTicketCheckService.checkTicket(123456, 2468)).toEqual("Probeer opnieuw aub")
        expect(jahTicketCheckService.checkTicket(123456, 2469)).toEqual("Probeer opnieuw aub")
    });
    test ("CheckTicket - ts1 ", () => {
        expect(jahTicketCheckService.checkTicket(123456, 2468)).toEqual("Probeer opnieuw aub")
        expect(jahTicketCheckService.checkTicket(123456, 2469)).toEqual("Probeer opnieuw aub")
        expect(jahTicketCheckService.checkTicket(123456, 2470))
            .toEqual("Ticketnummer werd geblokkeerd")
    });
    test ("CheckTicket - ts7 ", () => {
        expect(jahTicketCheckService.checkTicket(123458, 1234)).toEqual("Ga verder met de reservatie")
    });
    test ("CheckTicket - ts5 ", () => {
        expect(jahTicketCheckService.checkTicket(123458, 1234)).toEqual("Ga verder met de reservatie")
        expect(jahTicketCheckService.checkTicket(123458, 1234))
            .toEqual("Er is op dit ticket al gereserveerd")
    });
});
