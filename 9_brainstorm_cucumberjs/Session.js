const sbjct = require("./Subject.js");
const Subject = sbjct.Subject;
const ACTUAL = sbjct.ACTUAL, PREVIOUS = sbjct.PREVIOUS, CLOSED = sbjct.CLOSED;

class Session {

    /**
     * constructor for Session
     * creates a brainstorm Session instance with no subjects
     * @param sessionTitle of the brainstorm session
     */
    constructor(sessionTitle) {
        this.title = sessionTitle;
        this.subjects = [];
    }

    /**
     * create a first subject for the session
     * @param subjectTitle: title of the subject
     * @return the created instance of Subject
     */
    createFirstSubject(subjectTitle) {
        let subject = new Subject(subjectTitle);
        this.subjects.push(subject);
        return subject;
    }

    /**
     * find ACTUAL subject and change it to PREVIOUS
     * create new ACTUAL subject
     * @param subjectTitle
     */
    changeSubject(subjectTitle) {
        let actualSubject = this.subjects.find( (s) => s.status === ACTUAL );
        let newSubject = actualSubject.changeSubject(subjectTitle);
        this.subjects.push(newSubject);
        return (newSubject)
    }

    /**
     * search subject by subjectTitle
     * @param subjectTitle
     * @return the found subject or undefined
     */
    searchSubject(subjectTitle) {
        return this.subjects.find(subject => subject.title === subjectTitle);
    }

    printBrainstorm(sessionTitle) {
        console.log("\nBRAINSTORM - "+sessionTitle);
        this.subjects.forEach(  (subject) => {
            console.log("\n"+subject.title);
            subject.contributions.forEach( (contribution) => {
                console.log("-- "+contribution);
            })
        })
        console.log();
    }
}

class Person {

    constructor(firstName) {
        this.firstName = firstName;
        this.roles = [];
    }

    addRole(role) {
        this.roles.push(role);
    }
}

class Role {

    constructor(userName, session) {
        this.userName = userName;
        this.session = session;
    }
}

class Facilitator extends Role {

    constructor(userName, session) {
        super(userName, session);
    }
}

class Participant extends Role {

    constructor(userName, session) {
        super(userName, session);
    }
}

module.exports = {
    Session, Subject, ACTUAL, PREVIOUS, CLOSED,
    Person, Role, Facilitator, Participant
};