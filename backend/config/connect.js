const mysql = require('mysql');
module.exports = {
con: mysql.createConnection({
host: 'webitcloud.net',
user: 'webitclo_B401',
password: 'PW1819#B401272',
database: 'webitclo_B401'
})
};