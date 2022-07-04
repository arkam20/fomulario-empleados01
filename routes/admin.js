//Se declara la ruta
var express = require ('express');
var router = express.Router();


router.get('/', function(req,res){
    //res.send('prueba')

    var saludo = 'aver si sale esta practica, que rollo'

    res.render('index',{saludo:saludo})   
})

router.post('/post',function(req,res){
    console.log(req.body)
})

//Al final lo exporta al apps.js
module.exports = router;