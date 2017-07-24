var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var twitter = require('./providers/twitter');
var facebook = require('./providers/facebook');
var instagram = require('./providers/instagram');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

    console.log('Nouvelle connexion au serveur !');

    setInterval(function () {

        twitter.get(function (error, result) {
            if(!error && result) {
                io.emit('refresh counter twitter', result);
            } else {
                console.error('Twitter:', error);
            }
        });

        facebook.get(function (error, result) {
            if(!error && result) {
                io.emit('refresh counter facebook', result);
            } else {
                console.error('Facebook:', error);
            }
        });

        instagram.get(function (error, result) {
            if(!error && result) {
                io.emit('refresh counter instagram', result);
            } else {
                console.error('Instagram:', error);
            }
        });

    }, 60000);

    socket.on('disconnect', function(){
        console.log('Déconnexion du serveur');
    });

});

http.listen(3000, function(){
    console.log('Écoute sur le port 3000');
});