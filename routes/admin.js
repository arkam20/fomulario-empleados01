//Se declara la ruta
var express = require ('express');
var router = express.Router();
var _=require('lodash')

var mariadb = require('mariadb')


var colors = require('colors');


router.get('/', async function(req,res){
    
    console.log('/index')
    console.log(req.session)
    console.log('usuario: '+ req.session.user);


    if (req.session.user == undefined){
        res.redirect('/login')
    } else if(req.session.user != "" && req.session.rol =='regular'){
        res.render('index');
    } else if(req.session.user!="" && req.session.rol=='admin') {
        res.render('ajax',{user:req.session.user});
    } 
    else {
        res.render('login')
    }
}) 

router.get('/login', (req,res) =>{
    console.log('login antes de delete req')
    delete req.session.destroy();
    console.log(req.session)
    console.log('despues de delete req')
    res.render('login')
});

router.post('/qryLogin', async function(req,res){

    //se borran la cookie de sesion
    console.log(req.body);


    //Se crea la consulta
    let consulta = await mySqlQuery(`select * from login where username="${req.body.username}" and password="${req.body.password}"`)

    console.log('QqryLogin')
    console.log(_.size(consulta));
    console.log(req.session);

    //Si el valor es 1 entonces la consulta regreso datos
    if(_.size(consulta) == 1) {               
        req.session.user = consulta[0]['username']
        req.session.nombre = consulta[0]['name']
        req.session.rol = consulta[0]['role']

        //Enviar al raiz
        res.redirect('/');
    }else { 
                
      }
    

})

router.get('/reg_user',function(req,res){
    
    console.log('reg_user'.bgYellow);
    console.log(req.session.user);
    console.log(req.session.rol);

    if (req.session.user == undefined){
        res.redirect('/login')
    } else if(req.session.user != "" && req.session.rol =='admin'){
        res.render('index');
    }
    else {
        res.render('login')
    }
})


router.get('/all_users',async function(req,res){
    
    if (req.session.user == undefined){
        res.redirect('/login')
    } else if(req.session.user != "" && req.session.rol =='admin'){
        //realizar consulta regresar el response a la vista
        console.log("listado de usuarios".bgWhite);
        let usuarios = await mySqlQuery(`select * from login`)
        console.log(usuarios);
        
        //Se pasa el resultado del Query
        res.render('lt_usuarios',{usuarios});
    }
    else {
        res.render('login')
    }
    
  
});


router.get('/index',function(req,res){
    res.render('index')
})

router.post('/post',function(req,res){
    console.log(req.body)
})

router.post('/tabloide', function(req,res){
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