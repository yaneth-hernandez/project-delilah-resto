 async function crearProductos(nombre, descripcion, imagen, precio) {
     const formData = new FormData()
     formData.append('nombre', nombre)
     formData.append('descripcion', descripcion)
     formData.append('precio', precio)
     formData.append('file', imagen[0], imagen[0].name)

     let reqInit = {
         method: 'POST',
         headers: {
             "Accept": "application/json, image/* ",
             "Content-Type": "multipart/form-data"
         },
         body: formData
     }
     delete reqInit.headers['Content-Type']

     let respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/productos/upload', reqInit)
     if (respuestaFectch != null) {
         let creoProducto = await respuestaFectch.json()
         return creoProducto
     }
 }

 function eventoLimpiarFormulario() {
     let limpiar = document.getElementById("limpiar-cargar-id")
     limpiar.addEventListener('click', () => {
         limpiarFormulario()
     })
 }
 window.addEventListener('load', eventoLimpiarFormulario)

 function limpiarFormulario() {
     document.querySelector("#nom-prod-cargar-id").value = ''
     document.querySelector("#des-prod-cargar-id").value = ''
     document.querySelector("#img-admin-cargar-id").value = ''
     document.querySelector("#precio-admin-cargar-id").value = ''
 }