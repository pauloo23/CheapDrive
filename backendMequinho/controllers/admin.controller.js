//definição de constantes
const saltRounds = 10;
const connect = require('../config/connect');
var bcrypt = require('bcrypt');


//COLOCAR AQUI FUNCOES ---------------

//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT email, password from Administrador', function(err,
        rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);

    });
}

//função de leitura que retorna o resultado de um idadmin
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const idadmin = req.sanitize('id').escape();
    const post = {
        idAdmin: idadmin
    };
    connect.con.query('SELECT email, password, from Administrador where idadmin = ? ', post,
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                }
                else {
                    res.status(200).send(rows);
                }
            }
            else
                res.status(400).send({
                    "msg": err.code
                });
            console.log('Error while performing Query.', err);
        });
}

//função de gravação que recebe os 2 parâmetros
function save(req, res) {
    //receber os dados do registo do admin que são enviados por post
    const email = req.sanitize('email').escape();
    const password = req.sanitize('pass').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) {
        var post = {
            email: email,
            password: hash
        };
        console.log("with hash:" + hash);
        query = connect.con.query('INSERT INTO Administrador SET ?', post, function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(200).location(rows.insertId).send({
                    "msg": "inserted with success"
                });
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(409).send({ "msg": err.code });
                    console.log('Error while performing Query.', err);
                }
                else res.status(400).send({ "msg": err.code });
            }
        });
    });
}

//efetuar update de todos os dados para um determinado idadmin
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const email = req.sanitize('email').escape();
    const password = req.sanitize('pass').escape();
    const idadmin = req.sanitize('id').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log("with hash:" + hash);
        var update = {
            email,
            hash,
            idadmin
        };
        query = connect.con.query('INSERT INTO Administrador SET  email =?, password=? where idadmin=?', update, function(err, rows,
            fields) {

            console.log(query.sql);
            if (!err) {
                console.log("Number of records updated: " + rows.affectedRows);
                res.status(200).send({ "msg": "update with success" });
            }
            else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        });
    });
}

//função que apaga todos os dados de um idadmin
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const idadmin = req.sanitize('id').escape();
    const post = {
        idAdmin: idadmin
    };
    connect.con.query('DELETE from Administrador where idadmin = ?', post, function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}



//exportar as funções
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID
};