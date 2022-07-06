//Se declara la ruta
var express = require ('express');
var router = express.Router();


router.get('/', function(req,res){
    //res.send('prueba')

    var saludo = 'aver si sale esta practica, que rollo'

    res.render('login',{saludo:saludo})   
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

//Al final lo exporta al apps.js
module.exports = router;