/*const mysql = require('mysql');
module.exports = {
con: mysql.createConnection({
host: '127.0.0.1',
user: 'root',
password: 'root',
database: 'db_isi_203'
})
};*/


var mysql = require('mysql')
var con = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'merPpxv9vl',
    password: 'ehty9VG9ki',
    database: 'merPpxv9vl'
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



//connection.end()


