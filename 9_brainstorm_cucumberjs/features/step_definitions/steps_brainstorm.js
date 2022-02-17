const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require('assert');

const ssn = require("../../Session.js");
const Session = ssn.Session;
const Subject = ssn.Subject;
const Person = ssn.Person, Role = ssn.Role, Facilitator = ssn.Facilitator, Participant = ssn.Participant;
const ACTUAL = ssn.ACTUAL, PREVIOUS = ssn.PREVIOUS, CLOSED = ssn.CLOSED;

let session;
let hans, hansFacilitator;
let jeremy, jeremyParticipant;
let subjectStatusValues = {"actueel": ACTUAL, "vorig": PREVIOUS, "gesloten": CLOSED};


Given('er is een brainstormsessie beschikbaar zonder onderwerp', function () {
    session = new Session("Verhelderende brainstormsessie");
    assert.strictEqual(session.subjects.length, 0);
});

Given(/^er is een persoon Hans, met een facilitator rol$/, function () {
    hans = new Person("Hans");
    hansFacilitator = new Facilitator("hansF", session);
    hans.addRole(hansFacilitator);
});

Given(/^er is een deelnemer Jeremy, met een deelnemer rol$/, function () {
    jeremy = new Person("Jeremy");
    jeremyParticipant = new Participant("jeremyP", session);
    jeremy.addRole(jeremyParticipant);
});

When(/^Hans ?(?:heeft)? een onderwerp "([^"]*)" ?(?:creëert|gecreëerd)?$/, function (subjectTitle) {
    session.createFirstSubject(subjectTitle);
});

When(/^Jeremy ?(?:heeft)? voor het onderwerp "([^"]*)" een idee ?(?:creëert|gecreëerd) "([^"]*)"$/
    , function (subjectTitle, ideaText) {
    let theSubject = session.searchSubject(subjectTitle);
    theSubject.addContribution(ideaText);
});

Then(/^zou de status van "([^"]*)" ([^"]*) moeten zijn$/, function (subjectTitle, expectedStatus) {
    let theSubject = session.searchSubject(subjectTitle);
    assert.strictEqual(subjectStatusValues[expectedStatus], theSubject.status);
});

Then(/^zou voor het onderwerp "([^"]*)" het idee "([^"]*)" gecreëerd moeten zijn$/
    , function (subjectTitle, expectedContribution) {
    let theSubject = session.searchSubject(subjectTitle);
    // Verify that expectedContribution can be found in the list array of contributions
    assert.strictEqual(theSubject.contributions
        .find( (contribution) => contribution === expectedContribution ), expectedContribution);
});

Then(/^is de brainstormsessie "([^"]*)" afgelopen$/, function (sessionTitle) {
    session.printBrainstorm(sessionTitle);
});

When(/^Hans ?(?:heeft)? het onderwerp ?(?:verandert|veranderd) in "([^"]*)"$/, function (subjectTitle) {
    session.changeSubject(subjectTitle);
});

When(/^zou voor het onderwerp "([^"]*)" het idee "([^"]*)" niet mogen gecreëerd zijn$/
    , function (subjectTitle, expectedContribution) {
        let theSubject = session.searchSubject(subjectTitle);
        // Verify that expectedContribution cannot be found in the list array of contributions
        assert.strictEqual(theSubject.contributions
            .find( (contribution) => contribution === expectedContribution ), undefined);
});

When(/^Jeremy volgende ideeën creëert:$/, async function (dataTable) {
    for (let i = 1; i < dataTable.rawTable.length; i++) {
        let theSubject = session.searchSubject(dataTable.rawTable[i][0]);
        let idee = dataTable.rawTable[i][1];
        theSubject.addContribution(idee);
    }
});

Then(/^zou de status van de onderwerpen als volgt moeten zijn:$/, function (dataTable) {
    for (let i = 1; i < dataTable.rawTable.length; i++) {
        let theSubject = session.searchSubject(dataTable.rawTable[i][0]);
        let expectedStatus = dataTable.rawTable[i][1];
        assert.strictEqual(subjectStatusValues[expectedStatus], theSubject.status);
    }
});

Then(/^zouden volgende ideeën al dan niet moeten gecreëerd zijn:$/, function (dataTable) {
    for (let i = 1; i < dataTable.rawTable.length; i++) {
        let theSubject = session.searchSubject(dataTable.rawTable[i][0]);
        let expectedContribution = dataTable.rawTable[i][1];
        let foundContribution = theSubject.contributions
            .find( (contribution) => contribution === expectedContribution );
        let gelukt = dataTable.rawTable[i][2];
        if (gelukt === "ok") assert.strictEqual(foundContribution, expectedContribution);
        else assert.strictEqual(foundContribution, undefined);
    }
});