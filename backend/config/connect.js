const mysql = require('mysql');
module.exports = {
con: mysql.createConnection({
host: '127.0.0.1',
user: 'root',
password: 'isi_203_2020',
database: 'db_isi_203'
})
};