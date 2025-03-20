const EventEmitter = require('events');
class SendEmail extends EventEmitter {}
module.exports = new SendEmail();
