const log4js= require('log4js');

log4js.configure({
    appenders: {
        console: {type: 'console'},
        ticketchecklog: {type: 'file', filename: '6_dtt/jahTicketCheckService.log', flags: 'w'}
    },
    categories: {
        ticketchecks: {appenders: ['ticketchecklog'], level: 'info'},
        default: {appenders: ['console', 'ticketchecklog'], level: 'trace'}
    }
});

const logger = log4js.getLogger('ticketchecks');

class JahTicketCheckService {

    checkTicketExistence(ticketno) {
        // TODO
    }

    checkTicket(ticketno, klantno) {
        // TODO
    }
}

module.exports = {
    JahTicketCheckService,
    logger
};
