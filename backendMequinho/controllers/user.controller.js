const connect = require('../config/connect.js')
//const pool = require('db-pool');


function read(req, res) {
connect.getConnection(function (err, conn) {
    if (err)
        return res.send(400);

    // if you got a connection...
    conn.query('SELECT * FROM users ', function(err, rows) {
        if(err) {
            conn.release();


        }

        // for simplicity, just send the rows
        res.send(rows);

        // CLOSE THE CONNECTION
        conn.release();
    })
});}

module.exports = {
    read : read
};













/*
function read(req, res) {

    connect.con.query('SELECT * FROM users order by id', function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            if (rows.length == 0) {
                res.send("erro");
            }
            else {
                res.send(rows);
            }
        }
    });
}
*/

//Export functions
module.exports = {

    read: read
};

