// const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'SIMS'
// });

// module.exports = db;



const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'beroogxcnmmnckxglpqc-mysql.services.clever-cloud.com',
    user: 'u3lelttq538reowu',
    password: 'XaIa5goSIJJHXTwTg91l',
    database: 'beroogxcnmmnckxglpqc'
});

module.exports = db;