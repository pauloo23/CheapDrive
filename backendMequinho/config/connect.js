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
    user: '7SYqEUFk1K',
    password: 'LHqa8UhmN2',
    database: '7SYqEUFk1K'
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



//connection.end()


