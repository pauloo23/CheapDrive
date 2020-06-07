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


function readC(req, res) {
    connect.getConnection(function (err, conn) {
        if (err)
            return res.send(400);

        // if you got a connection...
        conn.query('SELECT * FROM cliques ', function(err, rows) {
            if(err) {
                conn.release();


            }

            // for simplicity, just send the rows
            res.send(rows);

            // CLOSE THE CONNECTION
            conn.release();
        })
    });}


function saveU(req, res) {
    var opiniao = {
        empresa: "Uber",

    };
    var insert_query = 'INSERT INTO cliques SET ?';
    connect.getConnection(function (err, conn) {
        if (err)
            return res.send(400);



        // if you got a connection...
        conn.query(insert_query, opiniao, function(err, rows, fields) {
            if (err) throw err
            console.log('Comentário inserido com sucesso!');
        });

        res.send('Comentário inserido com sucesso!');
        // CLOSE THE CONNECTION
        conn.release();
    })
};

function saveK(req, res) {
    var opiniao = {
        empresa: "Kapten",

    };
    var insert_query = 'INSERT INTO cliques SET ?';
    connect.getConnection(function (err, conn) {
        if (err)
            return res.send(400);



        // if you got a connection...
        conn.query(insert_query, opiniao, function(err, rows, fields) {
            if (err) throw err
            console.log('Comentário inserido com sucesso!');
        });

        res.send('Comentário inserido com sucesso!');
        // CLOSE THE CONNECTION
        conn.release();
    })
};


function saveB(req, res) {
    var opiniao = {
        empresa: "Bolt",

    };
    var insert_query = 'INSERT INTO cliques SET ?';
    connect.getConnection(function (err, conn) {
        if (err)
            return res.send(400);



        // if you got a connection...
        conn.query(insert_query, opiniao, function(err, rows, fields) {
            if (err) throw err
            console.log('Comentário inserido com sucesso!');
        });

        res.send('Comentário inserido com sucesso!');
        // CLOSE THE CONNECTION
        conn.release();
    })
};







//Export functions
module.exports = {

    read: read,
    readC: readC,
    saveU: saveU,
    saveB: saveB,
    saveK: saveK

};


