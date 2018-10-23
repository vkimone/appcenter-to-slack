var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var _ = require('underscore');
var sendMsg = require('./lib/send-msg');

// Validate config
if (_.isUndefined(process.env.SLACK_TOKEN)) {
    throw "Slack Access token required";
}

var app = express();
app.use(bodyParser.json());

var server = http.createServer(app);
app.set('port', (process.env.PORT || 8000));
app.post('/', function (request, response) {
    
    // Validate request
    if (_.isUndefined(request.query.channel_id)){
        response.status(400).end();
        throw "Name or Id of the Slack channel required";
    } else {
        response.status(204).end();
        
        request.body.channel_id = request.query.channel_id;

        if (!_.isUndefined(request.body.release_notes)) {
            //Distribution
            sendMsg.distribution(request.body);
        } else if (!_.isUndefined(request.body.build_status)) {
            //Build
            sendMsg.build(request.body);
        } else {
            //Ping
            sendMsg.ping(request.body);
        }
    }



});

server.listen(process.env.PORT || 8000, function () {
	console.log('Express server listening on port ' + server.address().port);

	console.log('[Start] SLACK server  v.1.0.0');
	console.log(new Date().toLocaleString('en-US') + '\r\n');
});