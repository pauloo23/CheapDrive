const connect = require('../config/connect.js');
 function read(req,res){
    connection.query('SELECT  id, nome, apelido, tipo, email, password, sobre, last_login, status, createdAt , updatedAt from users',
        function (err,rows, fields) {
            if (!err) {
                if (rows.length == 0) {
                    res.status(404).send("Data not found");
                } else {
                    res.status(200).send(rows);
                }
            }else
            console.log('Error while performing Query.', err);
        });
}


function readID(req, res) {
    const id = req.sanitize('id').escape();
    const post = {
        id: id
    };
    connection.query('SELECT  id, nome, apelido, username, tipo, email, password, sobre, last_login, status, createdAt, updatedAt from users where id = ?', post,
    function (err, rows, fields) {
        if (!err) {
    if (rows.length == 0) {
        res.status(404).send({
            "msg": "data not found"
        });
        } else {
            res.status(200).send(rows);
        }
    } else
    res.status(400).send({
    "msg": err.code
    });
    console.log('Error while performing Query.', err);
    });
}

function update(req,res){
    console.log('update corrido');
    const id = req.sanitize('id').escape();
    const nome = req.sanitize('nome').escape();
	const apelido = req.sanitize('apelido').escape();
	const username = req.sanitize('username').escape();
	const tipo = req.sanitize('tipo').escape();
	const email = req.sanitize('email').escape();
	const password = req.sanitize('password').escape();
	const sobre = req.sanitize('sobre').escape();
	const last_login = req.sanitize('last_login').escape();
    const status = req.sanitize('status').escape();
	const createdAt = req.sanitize('createdAt').escape();
	const updatedAt = req.sanitize('updatedAt').escape();
	var update = [id, nome, apelido, username, tipo, email, password, sobre, last_login, status, createdAt, updatedAt];
    console.log(update);
    connection.query("UPDATE users SET id = ?, nome = ?, apelido = ?, username = ?, tipo = ?, email = ?, password = ?, sobre = ?, last_login = ?, status = ?, createdAt = ?, updatedAt = ?  WHERE id = ?", update,function(err,rows,fields){
       if (!err) {
           console.log("Number of records updated: " + rows.affectedRows);
           res.status(200).send({"msg": "update with success"});

       } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing Query.', err);
        }
    });
}

function deleteID(req, res) {
    console.log('delete a ser corrido');
    const id = req.sanitize('id').escape();
    const post = [id];
    console.log(id);
    connection.query("DELETE from users where id = ?", post, function (err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send({
                "msg": "data not found"
                });
            } else {
                res.status(200).send({
                "msg": "success"

                });
            }
            } else
            console.log('Error while performing Query.', err);
    });
}
function save(req, res) {
    console.log('save corrido');
    const id = req.sanitize('id').escape();
    const nome = req.sanitize('nome').escape();
    const apelido = req.sanitize('apelido').escape();
	const username = req.sanitize('username').escape();
	const tipo = req.sanitize('tipo').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
	const sobre = req.sanitize('sobre').escape();
	const last_login = req.sanitize('last_login').escape();
	const status = req.sanitize('status').escape();
	const createdAt = req.sanitize('createdAt').escape();
	const updatedAt = req.sanitize('updatedAt').escape();
    var query = "";
    var post = {
        id: id,
		nome : nome,
		apelido: apelido,
		username: username,
		tipo: tipo,
		email: email,
		password: password,
		sobre: sobre,
		last_login: last_login,
		status: status,
		createdAt: createdAt,
		updatedAt: updatedAt,
		  }
        query = connection.query('INSERT INTO users SET ?', post, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({
            "msg": "inserted with success"
        });
        console.log("Number of records inserted: " + rows.affectedRows);
        } else {
        if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
    } else res.status(400).send({"msg": err.code});
    }
    });
}


module.exports = {
    read : read,
    readID : readID,
    update : update,
    deleteID : deleteID,
    save: save

}