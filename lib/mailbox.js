var events = require('events')
var sys = require('sys')
var fs = require('fs')

function Maildir(path) {
	this.path = path
	events.EventEmitter.call(this)	
}
sys.inherits(Maildir, events.EventEmitter)

Maildir.prototype.appendMessage = function(callback) {
	var messageName = generateMessageName()
	var s = fs.createWriteStream(this.path + '/tmp/' + messageName, 
		{flags: process.O_CREAT | process.O_EXCL | process.O_WRONLY
		, mode: 0600}
	)
	var self = this
	if(callback) {
		s.on('error', function(err) {
			if(err.message.match(/EEXIST/)) {
				self.appendMessage(callback)
			} else {
				callback(err, s)
			}
		})
		s.on('open', function(fd) {
			callback(null, s)
		})
	}
	return s
}

function generateMessageName() {
	var d = new Date()
	return d.valueOf() + "." + process.pid + "." + d.getMilliseconds()
}

exports.Maildir = Maildir
