//definição de constantes
const connect = require('../config/connect');
const jsonMessages = require('../assets/jsonMessages/bd.js');

//COLOCAR AQUI FUNCOES ---------------



//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Evento', function(err,
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

//função de leitura que retorna o resultado de um idevento
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const idevento = req.sanitize('id').escape();
    const post = {
        idEvento: idevento
    };
    connect.con.query('SELECT nome, dataa, tipo_evento, local from Evento where idevento = ?', post,
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

//função de gravação que recebe os 4 parâmetros
function save(req, res) {
    //receber os dados do formulário que são enviados por post


    var query = "";
    var post = {
        nome: req.body.nome,
        local: req.body.local,
        dataa: req.body.dataa,
        tipo_evento: req.body.tipo_evento,
    };


    query = connect.con.query('INSERT INTO Evento SET ?', post, function(err, rows, fields) {
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


//efetuar update de todos os dados para um determinado idevento
function update(req, res) {
    //receber os dados do formulário de empresa que são enviados por post

    var update = {
        nome: req.body.nome,
        local: req.body.local,
        dataa: req.body.dataa,
        tipo_evento: req.body.tipo_evento,

    };
    connect.con.query('INSERT INTO Evento SET  nome =?, dataa =?, tipo_evento =?, local =?  where idevento=?', update, function(err, rows,
        fields) {

        if (!err) {
            res.status(jsonMessages.bd.successInsert.status).send(jsonMessages.bd.successInsert);
        }
        else {
            console.log(err);
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }
    });
}
//função que apaga todos os dados de um idevento
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const idevento = req.sanitize('id').escape();
    const post = {
        idEvento: idevento
    };
    connect.con.query('DELETE from Evento where idevento = ?', post, function(err, rows, fields) {
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