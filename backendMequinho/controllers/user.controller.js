const connect = require('../config/connect.js')

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


//Export functions
module.exports = {

    read: read
};

