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
    host: 'bimkmbsuzu5uo5cx9ma3-mysql.services.clever-cloud.com',
    user: 'ujwvlemutufzqn81',
    password: 'ulMFTxJ3BCUTAIcqupzc',
    database: 'bimkmbsuzu5uo5cx9ma3'
});

module.exports = db;         