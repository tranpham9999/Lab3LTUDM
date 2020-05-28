var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var mysql = require("mysql");


server.listen(process.env.PORT || 3000);

var mangUserids = [];

io.sockets.on('connection', function (socket) {

    var connection = mysql.createPool({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'appmuaban;',
        port : '3306'
    });

    console.log("Co nguoi connect ne");

    socket.on('client_gui_sourceid', function (data) {

        socket.un = data;
        console.log("source: " + socket.un);

    });

    socket.on('client_gui_message', function (from, to , tn, sentat) {


        connection.getConnection(function(err) {
            if (err) throw err;
            console.log("Connected!");
            console.log(from);
            console.log(to);

            var sql = "INSERT INTO messages (MESSAGE, TENDANGNHAP, SENTAT, SENDTOTENDANGNHAP) VALUES (?, ? , ?, ?)";
            connection.query(sql, [tn, from, sentat, to], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });

        connection.getConnection(function(err1) {
            if (err1) throw err1;

            var sql1 = "SELECT TENNGDUNG FROM nguoidung WHERE TENDANGNHAP = ?";
            connection.query(sql1, [from], function (err1, result1) {
                if (err1) throw err1;
                console.log(result1[0].TENNGDUNG);
                socket.emit('server_gui_message', {message: tn,
                    tu : from,
                    den : to,
                    time : sentat,
                    name : result1[0].TENNGDUNG});
                io.sockets.emit(to, {message: tn,
                    tu : from,
                    den : to,
                    time : sentat,
                    name : result1[0].TENNGDUNG
                });

            });
        });




    });

});
