# node-child-process-message-queue
MQ for node child process
## Getting Start
```js
// var child = require('child_process').spawn( ... )
// assume that child is a child process
var MQBuilder = require('node-child-process-message-queue');
var MQ = MQBuilder(child);
// send message
MQ.send('1\n', function (data) {
    console.log('Handler #1: ', data);
});
MQ.send('3\n', function (data) {
    console.log('Handler #2: ', data);
});
```
## Set Timeout
```js
// throw the message if not response in 200ms
MQ.send('5', function (data) {
    console.log('Handler #3: ', data);
}, { timeout: 200 });
```