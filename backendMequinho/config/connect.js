

/*
var mysql = require('mysql')
var con = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'merPpxv9vl',
    password: 'ehty9VG9ki',
    database: 'merPpxv9vl',
    queueLimit : 0, // unlimited queueing
    connectionLimit : 0 // unlimited connections
});
*/

/*
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

*/

//connection.end()





const mysql = require('mysql');
const pool = mysql.createPool({
    host            : 'remotemysql.com',
    user            : 'merPpxv9vl',
    password        : 'ehty9VG9ki',
    database        : 'merPpxv9vl',
    connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
    multipleStatements : true           // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
});

module.exports = pool;

/*
    pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);

        // if you got a connection...
        conn.query('SELECT * FROM users ', function(err, rows) {
            if(err) {
                conn.release();
                //const a = console.log('Couldnt get a connection');
                //return a;
                console.log('CONNECTION ARDEU');
            }

            // for simplicity, just send the rows
            console.log(rows);

            // CLOSE THE CONNECTION
            conn.release();
        })
    });*/
