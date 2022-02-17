const ACTUAL = 1, PREVIOUS = 2, CLOSED = 3;

class Subject {

    /**
     *  constructor for Subject
     *  to be used for the creation of the first subject
     *  thus having no previousSubject
     *  @param title the title of the subject
     */
    constructor(title) {
        this.title = title;
        this.status = ACTUAL;
        this.previous = undefined;
        this.contributions = [];
    }

    /**
     * add a contribution to the list of contributions
     * @param contributionText: the text of the contribution
     * @return true if the contribution could be added, false otherwise
     */
    addContribution(contributionText) {
        if (this.status === ACTUAL || this.status === PREVIOUS) {
            this.contributions.push(contributionText);
            return true;
        } else {
            return false;
        }
    }

    /**
     * create a new subject instance
     * change own status from ACTUAL to PREVIOUS
     * @param titleOfNewSubject: title of the new subject instance
     * @return the new subject instance
     */
    changeSubject(titleOfNewSubject) {
        let newSubject = undefined;
        if (this.status === ACTUAL) {
            newSubject = new Subject(titleOfNewSubject);
            newSubject.previous = this;
        }
        this.status = this.status === ACTUAL ? PREVIOUS : CLOSED;
        if (this.previous !== undefined) this.previous.changeSubject("This title will not be used");
        return newSubject;
    }
}

module.exports = {
    Subject,
    ACTUAL, PREVIOUS, CLOSED
};