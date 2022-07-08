
$(document).ready(function(){

    let username = document.getElementById('username')

    let boton = document.getElementById('boton1')
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
    
                nombre : 'Pedro'
            },
            success: function(response) {

                username.innerText=response[0]["username"]

                console.log(response)
            }
        });
    })
})

