var mailbox = require('mailbox')

var maildir = new mailbox.Maildir('test')

maildir.appendMessage(function(s) {
	s.write('Subject: test message\r\n\r\nWhy hello thar!')
})

