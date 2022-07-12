var createError = require('http-errors')
var express = require('express')
var path = require('path')
var logger = require('morgan')
var session = require('express-session')
var cookieParser = require('cookie-parser')

// Se manda llamar la paqueteria para conexion a BD
//var mysql = require('mysql')

//SE establecen los parametros de conexion
/*var conexion = mysql.createConnection({
    host:'192.168.13.32',
    database:'playground-2',
    user:'LTMexico',
    password:'LTMexico'
}); 

//Se realiza la validacion de la conexion
conexion.connect(function(error){
    if(error){
        throw error;
    } else {
        console.log('CONEXION EXITOSA')
    }
}); 

//Se realiza un query de prueba hacia la bd
conexion.query('SELECT * from login', function(error,results,fields){
    if(error)
        throw error;

        results.forEach(result=>{
                console.log(result);
        })
});

conexion.end(); */

var adminRouter = require('./routes/admin');

var app = express();

// Aqui se establecen las vistas
app.set('views', path.join(__dirname, 'views'))

//Se establece el motor de vistas
app.set('view engine','ejs');

//establecer que se se va a usar sesiones con cookies
app.use(session({
    secret: 'keyboard_cat',
    resave: true,
    saveUninitialized: true,
    cookie:{secure:false},
    name:'valida'
}))

//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Aqui se establece la carpeta publica principal para poder acceder al resto de recursos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);


//Se establecen sesiones





app.use(cookieParser());

module.exports = app;