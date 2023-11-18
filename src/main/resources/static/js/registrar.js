// Call the dataTables jQuery plugin
$(document).ready(function() {
// on ready
});

async function registrarUsuario(){
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.apellido = document.getElementById('txtApellido').value;
    datos.email = document.getElementById('txtCorreo').value;
    datos.password = document.getElementById('txtPasswd').value;


     //Validar expresión De Nombre
     var re = /^[a-zA-Z]{0,45}$/;
     if(!re.test(document.getElementById('txtNombre').value) || document.getElementById('txtNombre').value == ""){
        alert('El campo "Nombre" no debe ir vacio, Ademas no pueden tener mas de 45 caracteres.');
        return;
     }

     //Validar expresión De Apellido
     var re = /^[a-zA-Z]{0,45}$/;
     if(!re.test(document.getElementById('txtApellido').value) || document.getElementById('txtApellido').value == ""){
        alert('El campo "Apellido" no debe ir vacio, Ademas no pueden tener mas de 45 caracteres.');
        return;
     }

     //Validar expresión De Correo
     var re = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
     if(!re.test(document.getElementById('txtCorreo').value)){
        alert('El correo ingresado no es valido.');
        return;
     }

    //Validar expresión De contraseña
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(!re.test(document.getElementById('txtPasswd').value)){
        alert('La contraseña debe tener mas de una mayuscula.');
        return;
    }

    //Validar contraseñas

    let repetirPassword = document.getElementById('txtRepetirPasswd').value;
    if (repetirPassword != datos.password) {
     alert('La contraseña que escribiste es diferente.');
        return;
    }

  const request = await fetch('api/usuarios', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //Llama la función de JSON, convierte un objeto js a String de JSON con stringify
    body: JSON.stringify(datos)
  });
  alert("La cuenta fue creada con exito!");
  window.location.href = 'login.html'

}
