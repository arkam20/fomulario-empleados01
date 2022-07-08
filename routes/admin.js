//Se declara la ruta
var express = require ('express');
var router = express.Router();

var mariadb = require('mariadb')


router.get('/', async function(req,res){
    //res.send('prueba')
    let consulta=await mySqlQuery(`select * from login`)
    console.log(consulta)

    var saludo = 'aver si sale esta practica, que rollo'

    res.render('ajax',{saludo:saludo})   
})

router.get('/index',function(req,res){
    res.render('index')
})

router.post('/post',function(req,res){
    console.log(req.body)
})

router.get('/tabloide', function(req,res){
    res.render('tabloide')
})

router.post('/consulta', async function(req,res){
    console.log(req.body.nombre)

    let consulta = await mySqlQuery('select * from login')

    res.json(consulta)

})


function oraQuery(query) {
    return new Promise(async function(resolve, reject) {
        let connection;

        try {
            connection = await oracledb.getConnection({
                user: process.env.ORA_USERNAME,
                password: process.env.ORA_PASSWORD,
                connectString: process.env.ORA_HOSTIPID
            });
            const result = await connection.execute(query);
            resolve(result.rows);

        } catch (err) { // catches errors in getConnection and the query
            reject(err);
        } finally {
            if (connection) { // the connection assignment worked, must release
                try {
                    await connection.release();
                } catch (e) {
                    console.error(e);
                }
            }
        }
    });
}

function mySqlQuery(query, param) {
    return new Promise(async function(resolve, reject) {
        let connection;

        try {
            connection = await mariadb.createConnection({
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_SCHEMANM,
                host: process.env.DB_HOSTIPID,
                port: 3306

            });
            const result = await connection.query(query, param);
            resolve(result);

        } catch (err) { // catches errors in getConnection and the query
            reject(err);
        } finally {
            if (connection) { // the connection assignment worked, must release
                try {
                    await connection.destroy();
                } catch (e) {
                    console.error(e);
                }
            }
        }
    });
}

//Al final lo exporta al apps.js
module.exports = router;