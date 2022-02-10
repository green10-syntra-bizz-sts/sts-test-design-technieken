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
}

module.exports = {
    Session, Subject, ACTUAL, PREVIOUS, CLOSED
};