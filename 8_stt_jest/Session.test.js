const ssn = require("./Session.js");
const Session = ssn.Session;
const Subject = ssn.Subject;
const ACTUAL = ssn.ACTUAL, PREVIOUS = ssn.PREVIOUS, CLOSED = ssn.CLOSED;

let session, subject;

beforeEach( () => {
    session = new Session();
    expect(session.subjects.length).toEqual(0);
    subject = session.createFirstSubject("1st subject");
})

test("The session can create a first subject with status ACTUAL", () => {
    expect(session.subjects.length).toEqual(1);
    expect(subject.title).toEqual("1st subject");
    expect(subject.status).toEqual(ACTUAL);
})

test("TC1 - The session can change the ACTUAL subject to PREVIOUS", () => {
    session.changeSubject("2nd subject");
    expect(subject.title).toEqual("1st subject");
    expect(subject.status).toEqual(PREVIOUS);
})

test("TC2 - Upon changing the subject, the session creates a new ACTUAL subject", () => {
    expect(session.subjects.length).toEqual(1);
    let newSubject = session.changeSubject("2nd subject");
    expect(newSubject.title).toEqual("2nd subject");
    expect(newSubject.status).toEqual(ACTUAL);
})

test("TC3 - Upon changing the subject, an eventual PREVIOUS subject changes to CLOSED", () => {
    expect(session.subjects.length).toEqual(1);
    let newSubject = session.changeSubject("2nd subject");
    let superNewSubject = session.changeSubject("3rd subject");
    expect(superNewSubject.title).toEqual("3rd subject");
    expect(superNewSubject.status).toEqual(ACTUAL);
    expect(newSubject.status).toEqual(PREVIOUS);
    expect(subject.status).toEqual(CLOSED);
})
