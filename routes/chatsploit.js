var express = require('express');
var router = express.Router();
var sql = require('../sql');
const mssql = require('mssql');


router.get('/findusers', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {
    let text = req.query.search;
    if(text === undefined){
        res.render('find', {
            text: text,
            headers: ['Username', 'Name', 'Email Address'],
            results: []
        })
    }

    let lowersearch = "%" + text.toLowerCase() +"%";
    sql.getPool().request()
        .input('searchstring', mssql.Char, lowersearch)
        .query(`SELECT username, name, email FROM dbo.users where username like @searchstring`)
        .then(
            result => {
                res.render('find', {
                    text: text,
                    headers: ['Username', 'Name', 'Email Address'],
                    results: result.recordsets[0]
                })
            },
            error => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(error, null, 2)); 
            }
    )
});

function getMessages(req, res, next){
    let with_user = req.query.with_user;

    let toggle = '1';
    if(req.query.refreshtoggle != undefined){
        if(req.query.refreshtoggle === '1'){
            toggle = '0';
        }
    }
    console.log(req.query.refreshtoggle);
    console.log(toggle);

    sql.runQuery(`SELECT from_user, to_user, message, sent FROM dbo.messages where 
                (from_user = '${with_user}' and to_user = '${req.user.username}') OR
                (from_user = '${req.user.username}' and to_user = '${with_user}')
                ORDER BY sent ASC;

                SELECT from_user as usr FROM dbo.messages where 
                to_user = '${req.user.username}'
                UNION
                SELECT to_user as usr FROM dbo.messages where 
                from_user = '${req.user.username}';
                `)
        .then(
            result => {
                res.render('messages', {
                    messages: result.recordsets[0],
                    convos: result.recordsets[1],
                    user: req.user.username,
                    with_user: with_user,
                    toggle: toggle
                })
            },
            error => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(error, null, 2)); 
            }
    )
}

router.get('/messages', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {
    getMessages(req, res, next);
});

router.post('/messages', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {
    let newmessage = req.body.newmessage;
    let user = req.body.user;
    let with_user = req.body.with_user;
    let now = new Date();

    sql.getPool().request()
            .input('from', mssql.Char, user)
            .input('to', mssql.Char, with_user)
            .input('msg', mssql.Char, newmessage)
            .input('sent', mssql.DateTime, now)
            .query('insert into dbo.messages(from_user, to_user, message, sent) values(@from, @to, @msg, @sent)')
            .then(
                result => {getMessages(req, res, next);},
                error => {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(error, null, 2)); 
                }
            )


});

module.exports = router;

