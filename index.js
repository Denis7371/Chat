/**
 * Created by DenisPC on 16.08.2016.
 */
var http = require('http');
var fs = require('fs');// что бы читать файл index.html
var socketio = require('socket.io'); //что бы работать с сокетами. Мы ранее установили эти зависимости.
var escape_html = require('escape-html');

var server = http.createServer();
var io = socketio(server);
var port = 3000;

fs.readFile('./index.html', function(err, html_string) {
    if(err){
        throw err;
    }
    io.on('connection', function (socket) {

        socket.on('message', function (data) {
            if(data && typeof data.nickname == 'string' && typeof data.message == 'string' && data.nickname && data.message) {
                socket.broadcast.emit('message',{nickname: escape_html(data.nickname), message: escape_html(data.message)});
            }
        });

    });
    server.on('request', function(request, response) {
        response.writeHeader(200, {'content-type': 'text/html'});
        response.end(html_string);
    })
    server.listen(port, function() {
        console.log('Server running on port ' + port);
    });

});