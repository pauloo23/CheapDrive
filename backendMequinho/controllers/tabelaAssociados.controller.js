//definição de constantes
const saltRounds = 10;
const connect = require('../config/connect');
var bcrypt = require('bcrypt');


//COLOCAR AQUI FUNCOES ---------------


//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT nome, email, localidade, contacto, doacao from Socio', function(err,
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

//função de leitura que retorna o resultado de um idsocio
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const idsocio = req.sanitize('id').escape();
    const post = {
        idSocio: idsocio
    };
    connect.con.query('SELECT nome, email, localidade, contacto, doacao from Socio where idsocio = ?', post,
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

//função de gravação que recebe os 6 parâmetros
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const name = req.sanitize('name').escape();
    const email = req.sanitize('email').escape();
    const localidade = req.sanitize('localidade').escape();
    const contacto = req.sanitize('contacto').escape();
    const doacao = req.sanitize('doacao').escape();

    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) { //nao se usa pass porque isso nao vai aparecer na tabela
        var post = {
            name: name,
            email: email,
            localidade: localidade,
            contacto: contacto,
            doacao: doacao,
            password: hash


        };
        console.log("with hash:" + hash);
        query = connect.con.query('INSERT INTO Socio SET ?', post, function(err, rows, fields) {
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

//efetuar update de todos os dados para um determinado idsocio
function update(req, res) {
    //receber os dados do formulário de sócio que são enviados por post
    const name = req.sanitize('name').escape();
    const email = req.sanitize('email').escape();
    const contacto = req.sanitize('contacto').escape();
    const localidade = req.sanitize('localidade').escape();
    const doacao = req.sanitize('doacao').escape();
    const idsocio = req.sanitize('id').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log("with hash:" + hash);
        var update = {
            name,
            email,
            contacto,
            localidade,
            doacao,
            hash,
            idsocio
        };
        query = connect.con.query('INSERT INTO Socio SET  nome =?, email =?, contacto =?, localidade =?, doacao =? where idsocio=?', update, function(err, rows,
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

//função que apaga todos os dados de um idsocio
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const idsocio = req.sanitize('id').escape();
    const post = {
        idSocio: idsocio
    };
    connect.con.query('DELETE from Socio where idsocio = ?', post, function(err, rows, fields) {
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