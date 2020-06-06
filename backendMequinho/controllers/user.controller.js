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






//Export functions
module.exports = {

    read: read

};

