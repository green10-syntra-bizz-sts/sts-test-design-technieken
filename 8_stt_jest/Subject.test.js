const sbjct = require("./Subject.js");
const Subject = sbjct.Subject;
const ACTUAL = sbjct.ACTUAL, PREVIOUS = sbjct.PREVIOUS, CLOSED = sbjct.CLOSED;

test("TC1 - SO-S1-S1-S1", () => {

    // S0-S1
    let subject = new Subject("Title of 1st subject");
    expect(subject.status).toEqual(ACTUAL);
    expect(subject.contributions.length).toEqual(0);

    // S1-S1
    expect(subject.addContribution("1st contribution to the subject")).toEqual(true);
    expect(subject.contributions.length).toEqual(1);
    expect(subject.contributions).toContain("1st contribution to the subject")
    expect(subject.status).toEqual(ACTUAL);

    // S1-S1
    expect(subject.addContribution("2nd contribution to the subject")).toEqual(true);
    expect(subject.contributions.length).toEqual(2);
    expect(subject.contributions).toContain("2nd contribution to the subject")
    expect(subject.contributions).toContain("1st contribution to the subject")
    expect(subject.status).toEqual(ACTUAL);
})

test("TC2 - S0-S1-S1-S2", () => {

    // S0-S1
    let subject = new Subject("Title of 1st subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.status).toEqual(ACTUAL);
    expect(subject.contributions.length).toEqual(0);

    // S1-S1
    expect(subject.addContribution("1st contribution to the subject")).toEqual(true);
    expect(subject.contributions.length).toEqual(1);
    expect(subject.contributions).toContain("1st contribution to the subject")
    expect(subject.status).toEqual(ACTUAL);

    // S1-S2
    subject.changeSubject("Title of 2nd subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(1);
    expect(subject.contributions).toContain("1st contribution to the subject")
    expect(subject.status).toEqual(PREVIOUS);
})

test("TC3 - S0-S1-S2-S2-S2", () => {

    // S0-S1
    let subject = new Subject("Title of 1st subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.status).toEqual(ACTUAL);
    expect(subject.contributions.length).toEqual(0);

    // S1-S2
    subject.changeSubject("Title of 2nd subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(0);
    expect(subject.status).toEqual(PREVIOUS);

    // S2-S2
    expect(subject.addContribution("1st contribution to the subject")).toEqual(true);
    expect(subject.contributions.length).toEqual(1);
    expect(subject.contributions).toContain("1st contribution to the subject")
    expect(subject.status).toEqual(PREVIOUS);

    // S2-S2
    expect(subject.addContribution("2nd contribution to the subject")).toEqual(true);
    expect(subject.contributions.length).toEqual(2);
    expect(subject.contributions).toContain("2nd contribution to the subject")
    expect(subject.contributions).toContain("1st contribution to the subject")
    expect(subject.status).toEqual(PREVIOUS);
})

test("TC4 - S0-S1-S2-S2-S3", () => {

    // S0-S1
    let subject = new Subject("Title of 1st subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.status).toEqual(ACTUAL);
    expect(subject.contributions.length).toEqual(0);

    // S1-S2
    subject.changeSubject("Title of 2nd subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(0);
    expect(subject.status).toEqual(PREVIOUS);

    // S2-S2
    expect(subject.addContribution("1st contribution to the subject")).toEqual(true);
    expect(subject.contributions.length).toEqual(1);
    expect(subject.contributions).toContain("1st contribution to the subject")
    expect(subject.status).toEqual(PREVIOUS);

    // S2-S3
    subject.changeSubject("Title of 3rd subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(1);
    expect(subject.status).toEqual(CLOSED);
    expect(subject.addContribution("2nd contribution to the subject")).toEqual(false);
})

test("TC5 - S0-S1-S2-S3-S3-S3", () => {

    // S0-S1
    let subject = new Subject("Title of 1st subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.status).toEqual(ACTUAL);
    expect(subject.contributions.length).toEqual(0);

    // S1-S2
    subject.changeSubject("Title of 2nd subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(0);
    expect(subject.status).toEqual(PREVIOUS);

    // S2-S3
    subject.changeSubject("Title of 3rd subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(0);
    expect(subject.status).toEqual(CLOSED);
    expect(subject.addContribution("1st contribution to the subject")).toEqual(false);

    // S3-S3
    subject.changeSubject("Title of 4th subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(0);
    expect(subject.status).toEqual(CLOSED);
    expect(subject.addContribution("1st contribution to the subject")).toEqual(false);

    // S3-S3
    subject.changeSubject("Title of 5th subject");
    expect(subject.title).toEqual("Title of 1st subject")
    expect(subject.contributions.length).toEqual(0);
    expect(subject.status).toEqual(CLOSED);
    expect(subject.addContribution("1st contribution to the subject")).toEqual(false);
})
