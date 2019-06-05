const sql = require('mssql');
const config = require('./config');

sql.on('error', err => {
    console.log(err);
})

let pool = undefined;

module.exports.connect = function(){
    sql.connect(config.getConfig()).then(pl => {
        pool = pl;
        console.log("Connected to SQL Server");
    })
}

module.exports.runQuery = function(qs){
    console.log("Running " + qs);
    return pool.request()
        .query(qs)
}

module.exports.getPool = function(){
    return pool;
}


