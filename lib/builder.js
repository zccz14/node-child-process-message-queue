"use strict";
var Builder = function (child) {
    var messages = []; // MQ Container
    // fired when child response
    child.stdout.on('data', function (data) {
        // get handler and dequeue
        var message = messages.shift();
        // prevent timeout
        message && message.timeout && clearTimeout(message.timeout);
        // call handler if exists
        message && message.handler && message.handler(data);
        // send next message to child if exists
        if (messages.length > 0) {
            child.stdin.write(messages[0].msg);
        }
    })
    /**
     * send message
     * @param msg {string|buffer} the msg to send
     * @param handler {function}  
     */
    var send = function send(msg, handler, options) {
        options = options || {};
        // if no message in queue
        // send the first message to child
        if (messages.length === 0) {
            child.stdin.write(msg);
        }
        var message = {
            msg: msg,
            handler: handler,
            timeout: null
        };
        // set timeout
        if (options.timeout) {
            message.timeout = setTimeout(function () {
                throw message;
            }, options.timeout)
        }
        // enqueue the message and handler
        messages.push(message);
    }
    return {
        send: send
    };
}

module.exports = Builder;