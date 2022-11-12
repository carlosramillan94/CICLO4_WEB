// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{
            RegistrarPersona();
            event.preventDefault()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

function RegistrarPersona(){
let Nombres = document.querySelector("#txtNombres").value;
let Apellidos = document.querySelector("#txtApellidos").value;
let Cedula = document.querySelector("#txtCedula").value;
let Correo = document.querySelector("#txtCorreo").value;
let Telefono = document.querySelector("#txtTelefono").value;
let Rol = "usuario";

let url ="http://localhost:3000/usuarios";
let datos = {
    cedula: Cedula,
    nombre: Nombres,
    apellido: Apellidos,
    correo: Correo,
    telefono: Telefono,
    rol: Rol
};
fetch(url,{
    method: 'POST',
    body: JSON.stringify(datos),
    headers:{
        'Content-Type': 'application/json'
    }
}).then(res => res.json())
.then(mensaje => {
    console.log(mensaje)
})
}
