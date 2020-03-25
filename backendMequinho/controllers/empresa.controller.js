//definição de constantes
const connect = require('../config/connect');
const jsonMessages = require( '../assets/jsonMessages/bd.js');  

//COLOCAR AQUI FUNCOES ---------------

function activate(req, res) {
    const id = req.sanitize('id').escape();

    query = connect.con.query('UPDATE Empresa SET estado = "ativo" where idEmpresa=?', id, function(err, rows,
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
}

//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Empresa', function(err,
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

//função de leitura que retorna o resultado de um idempresa
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const idempresa = req.sanitize('idempresa').escape();
    const post = {
        idempresa
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

//função de gravação que recebe os 8 parâmetros
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    
        var post = {
            nome: req.body.nome,
            email: req.body.email,
            localizacao: req.body.localizacao,
            contacto: req.body.contacto,
            doacao: req.body.doacao,
            site: req.body.site,
            tipo_empresa: req.body.tipo_empresa,
            };
        
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
    
}

//efetuar update do email e da password para um determinado idempresa
function update(req, res) {
    //receber os dados do formulário de empresa que são enviados por post
const idempresa = req.sanitize('idempresa').escape();
    
        var update = {

            nome: req.body.nome,
            email: req.body.email,
            localizacao: req.body.localizacao,
            tipo_empresa: req.body.tipo_empresa,
            site: req.body.site,
            contacto: req.body.contacto,
            doacao: req.body.doacao,
            
    idempresa};
        query = connect.con.query('INSERT INTO Empresa SET  email =?, nome=?, localizacao=?, tipo_empresa=?, site=?, contacto=?, doacao=?  where idempresa=?', update, function(err, rows,
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
    
}

//função que apaga todos os dados de um idempresa
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const idempresa = req.sanitize('idempresa').escape();
    const post = {
        idempresa
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
    deleteID: deleteID,
    activate: activate
};
