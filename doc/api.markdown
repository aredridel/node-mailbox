node-mailbox(3) -- A library for accessing on-disk mailboxes
============================================================================

## Synopsis

An example: 

    var mailbox = require('mailbox')
    var md = new mailbox.Maildir('Maildir')
    md.appendMessage(function(stream) {
	stream.write("Subject: testing\r\nFrom: node-mailbox\r\n\r\n")
	stream.write("Testing, 123!\r\n")
    })

## mailbox.Maildir

`mailbox.Maildir` is an object for accessing Maildir format mailboxes.

See http://cr.yp.to/proto/maildir.html for more information on the format.

### mailbox.Maildir.appendMessage(callback)

Creates a new message file in the `tmp` directory in the Maildir and calls
the callback with the open writable stream.

When there is no callback, it returns the writable stream, but any errors in
the stream will be emitted with an `'error'` event, including the very
possible `'EEXIST'` -- though this library uses the process id in the
filename, collisions are possible if other systems use other filename
formats, or is malicious in some way, or something weird happens.

When there is a callback, the retry is handled automatically.

The callback gets two arguments, `(err, writableStream)`

FIXME: when the file is closed, move it into `new/`
