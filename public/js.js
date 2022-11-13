const menu = document.getElementById("menu");
const containMenu = document.getElementById("contain-menu");
const cerrarMenu = document.getElementById("cerrar");

function abrirMenu(){
      menu.style.transform = `translateX(-200%)`;
      containMenu.style.transform = `translateX(100%)`;
      cerrarMenu.style.transform = `translateX(-200%)`;
}

function cerrar(){
      menu.style.transform = `translateX(0%)`;
      containMenu.style.transform = `translateX(-100%)`;
      cerrarMenu.style.transform = `translateX(-400%)`;
}


const socket = io();

/* envita el mensaje */
const username = document.getElementById("username")
const btn = document.getElementById("send")
const output = document.getElementById("output")

btn.addEventListener("click", function () {
      socket.emit("chat:message", {
            message: message.value,
            username: username.value
      });
});
socket.on("chat:message", function (data) {
      actions.innerHTML = '';
      output.innerHTML += `<p>
      <strong>${data.username}</strong>: ${data.message}
      </p>`

});

/* muestra al otro usuario cuando alguien esta escribiendo */
const actions = document.getElementById("actions")
const message = document.getElementById("message")

message.addEventListener("keypress", function () {
      socket.emit("chat:typing", username.value);
})
socket.on("chat:typing", function (data) {
      actions.innerHTML = `<p><em>${data} esta escribiendo... </em></p>`
});


/* notificacion de tarea asignada */
const prueba = document.getElementById("prueba")
const submit = document.getElementById("submit")
const titulo = document.getElementById("titulo")
const receptor = document.getElementById("receptor")

submit.addEventListener("click", function () {
      socket.emit("assignment:notification", {
            receptor: receptor.value,
            titulo: titulo.value,
      });
});
socket.on("assignment:notification", function (data) {
      prueba.innerHTML = '';
      prueba.innerHTML += `<p style="color:#fff;">
             <strong>Nueva tarea asignada a: ${data.receptor}.<br>
             Tarea: ${data.titulo}
             </strong></p>`
      Swal.fire({
            title: `Se te asigno una tarea: ${data.titulo}`,
            position: 'top-end',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
      })
})


/* avisa el usuario dueño de la tarea, que ya fue resuelta */
const prueba2 = document.getElementById("prueba2")
const estadoItemEditado = document.getElementById("estadoItemEditado")
const submitEdit = document.getElementById("submitEdit")

submitEdit.addEventListener("click", function () {
      socket.emit("aviso:terminotarea", estadoItemEditado.value);
});
socket.on("aviso:terminotarea", function (data) {
      prueba2.innerHTML = '';
      prueba2.innerHTML += `<p style="color:#fff;">
             <strong>Una tarea fue resuelta!<br>
             Estado tarea:  ${data}.
      lñ       </strong></p>`

      Swal.fire({
            title: `Tarea resuelta: ${data}`,
            showClass: {
                  popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
            }
      })
})