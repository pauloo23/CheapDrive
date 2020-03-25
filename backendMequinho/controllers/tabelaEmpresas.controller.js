//definição de constantes
const saltRounds = 10;
const connect = require('../config/connect');
var bcrypt = require('bcrypt');


//COLOCAR AQUI FUNCOES ---------------

//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    console.log("hjkl;");
    connect.con.query('SELECT * from Empresa', function(err,
        rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                console.log(rows);
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);

    });
}

//função de leitura que retorna o resultado de um idempresa
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const idempresa = req.sanitize('id').escape();
    const post = {
        idEmpresa: idempresa
    };
    connect.con.query('SELECT nome, email, localizacao, contacto, doacao, tipo_empresa, site from Empresa where idempresa = ?', post,
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

//função de gravação que recebe os 7 parâmetros
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const nome = req.sanitize('nome').escape();
    const email = req.sanitize('email').escape();
    const localizacao = req.sanitize('localizacao').escape();
    const contacto = req.sanitize('contacto').escape();
    const doacao = req.sanitize('doacao').escape();
    const site = req.sanitize('site').escape();
    const tipo_empresa = req.sanitize('tipo_empresa').escape();

    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) {
        var post = {
            nome: nome,
            email: email,
            localizaao: localizacao,
            contacto: contacto,
            doacao: doacao,
            site: site,
            tipo_empresa: tipo_empresa,



        };
        console.log("with hash:" + hash);
        query = connect.con.query('INSERT INTO Empresa SET ?', post, function(err, rows, fields) {
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

//efetuar update do email e da password para um determinado idempresa
function update(req, res) {
    //receber os dados do formulário de empresa que são enviados por post

    const email = req.sanitize('email').escape();
    const password = req.sanitize('pass').escape();

    const idempresa = req.sanitize('id').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log("with hash:" + hash);
        var update = {

            email,
            hash,
            idempresa
        };
        query = connect.con.query('INSERT INTO Empresa SET  email =?, password=?  where idempresa=?', update, function(err, rows,
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

//função que apaga todos os dados de um idempresa
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const idempresa = req.sanitize('id').escape();
    const post = {
        idEmpresa: idempresa
    };
    connect.con.query('DELETE from Empresa where idempresa = ?', post, function(err, rows, fields) {
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
