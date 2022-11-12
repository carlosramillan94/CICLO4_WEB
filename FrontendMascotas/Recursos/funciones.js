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
let nombres = document.querySelector("#txtNombres").nodeValue;
let apellidos = document.querySelector("#txtApellidos").nodeValue;
let cedula = document.querySelector("#txtCedula").nodeValue;
let correo = document.querySelector("#txtCorreo").nodeValue;
let telefono = document.querySelector("#txtTelefono").nodeValue;

let url ="http://localhost:3000/usuarios";
let datos = {
    nombre: nombres,
    apellido: apellidos,
    cedula: cedula,
    correo: correo,
    telefono: telefono
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
