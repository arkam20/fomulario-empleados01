
$(document).ready(function(){

    //let username = document.getElementById('username')

   /* let boton = document.getElementById('boton1')
    boton.addEventListener('click',function(){
        $.ajax({
            type: 'POST',
            url: '/consulta',
            data: {
                /*ctUsernameAddUser: event.target[0].value,
                ctEmployeNumberAddUser: event.target[1].value,
                ctPasswordAddUser: event.target[2].value,
                ctNombreAddUser: event.target[4].value,
                cbPlantAddUser: event.target[5].value,
                cbRolAddUser: event.target[6].value, */
    
        /*        nombre : 'Pedro'
            },
            success: function(response) {

                username.innerText=response[0]["username"]

                console.log(response)
            }
        });
    }) */

    let loginMensaje = document.getElementById('loginMensaje')
    let loginBtn = document.getElementById('loginBtn')
    
    //------ Se asignan las variables que contendran las credenciales de usuario
    let username = document.getElementById('username');
    let user_pass = document.getElementById('user_pass');

   /* loginBtn.addEventListener('click',function(){
        
        $.ajax({
            type: 'POST',
            url: '/qryLogin',
            data: {
                username: username.value,
                password: user_pass.value
            },
            success: function(response) {
                //console.log(response);

                //Se crea bandera para verificar si fue encontrado
                let encontrado = false

                //Se recorre el objeto response para validar las credenciales
              /*  for (let i in response){
                    if(response[i]["username"] == username.value && response[i]["password"] == user_pass.value){                       
                        encontrado = true;
                        loginMensaje.innerText = '';
                        autorizacion();
                    }
                } 
                if (!encontrado) {
                    loginMensaje.innerText = 'Credenciales no coinciden';
                } 
                
            } 
        }) 
    }) */
})

function autorizacion(req,res) {

    res.render('/tabloide');
    
}



