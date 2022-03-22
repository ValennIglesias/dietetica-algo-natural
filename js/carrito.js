let carrito= JSON.parse(localStorage.getItem("carro")) || []
let productos=[]
const contenedorProductoss = document.getElementById("contenedorProductos")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const contadorCarrito = document.getElementById("contadorCarrito")
const finalizarCompra = document.getElementById("finalizarCompra")
const vaciarCarrito = document.getElementById("vaciarCarrito")



fetch("../js/productos.json")
    .then (Response => Response.json())
    .then (data =>{for (let i = 0; i < data.length; i++) {
        productos.push(data[i])
        mostrarProductos(productos)
        actualizarCarrito( )
        
    }})
    


ordenarPrecio.addEventListener("change",()=>{
    if(ordenarPrecio.value == "todos"){
        
        mostrarProductos(productos.sort((a,b) => a.id - b.id))
        
    }

    else if(ordenarPrecio.value == "mayor"){
        
        mostrarProductos(productos.sort((a,b) => b.precio - a.precio))
        
    }
        
    else if(ordenarPrecio.value == "menor"){
        mostrarProductos(productos.sort((a,b) => a.precio - b.precio))
    }      
})

let botonModal = document.querySelector("#botonModal")

botonModal.addEventListener("click", ()=> {
    actualizarCarrito()
    imprimirEnCarrito()

}) 

function mostrarProductos(array){
    contenedorProductoss.innerHTML =''
    for (const producto of array) {
    const {id, nombre, precio, imagen} = producto
        
        let div = document.createElement("div")
        div.className= "producto"
        
        div.innerHTML += `<div class="productoUno"><img src=${imagen} alt="SALSA TAHINE">
                            <p class="producto"> ${nombre}</p>
                            <p class="precio producto">$${precio}</p>
                                <div class="comprar">
                                    <button class=" btn botonComprar" id="boton${id}" type="button">Comprar</button>
                                </div>
                        </div>`

        contenedorProductoss.appendChild(div)

        let botonAgregar = document.getElementById(`boton${producto.id}`)
        
        botonAgregar.addEventListener("click", ()=>{
            
            agregarAlCarrito(producto.id)
            
        })
    }
}


function agregarAlCarrito(id){

    let cantidades = carrito.find(item=> item.id == id)
    if (cantidades) {
        
        cantidades.cantidad++
        
        actualizarCarrito()
    }
    
    else{
        
    let agregarProducto = productos.find(elemento => elemento.id == id)
    
    carrito.push(agregarProducto)
    actualizarCarrito()
}

Toastify({
    text: "✅Producto agregado",
    className: "info",
    offset:{
        y: "150",
    },
    
    style: {
    background: "rgb(0, 196, 26)",
    }
}).showToast();

localStorage.setItem("carro", JSON.stringify(carrito))
}



function imprimirEnCarrito() {
    let contenedorModal = document.querySelector("#contenedorCarrito")
    contenedorModal.innerHTML = " "
    

    if (carrito.length >0) {
        actualizarCarrito()
        carrito.map(elemento=> {contenedorModal.innerHTML+= `<div id="${elemento.id}" >
                                                        <p class= "elementosCarrito">Producto:  ${elemento.nombre}</p>
                                                        <p class= "elementosCarrito"> Precio: ${elemento.precio}</p>
                                                        <button id="${elemento.id}" class="restarProducto"> - </button>
                                                        <p class= "elementosCarrito"> Cantidad: <span id="sumarCant" class="sumarCantidad">${elemento.cantidad}</span></p>
                                                        <button id="${elemento.id}" class="sumarProducto"> + </button>
                                                        <button id="botonEliminar${elemento.id}" class="eliminarProducto"> Eliminar </button>
                                                        </div>
                                                        
                                                        `})                                                              
    }
    else{
        contenedorModal.innerHTML =`
                                    <p>El carrito esta vacio</p>`
    }
    
    sumarProducto()
    restarProducto()
    cantidad0()
    eliminarCarrito()
}


function sumarProducto(){
    const botonSumar= document.getElementsByClassName("sumarProducto")
    const sumarCantidad=document.getElementsByClassName("sumarCantidad")
    for (let i = 0; i < botonSumar.length; i++) {
        botonSumar[i].addEventListener("click", ()=>{
            
            let filtrar = carrito.find(e=> e.id == botonSumar[i].id)
            
            filtrar.cantidad++
            sumarCantidad.innerHTML+=`${filtrar.cantidad}`
            
            imprimirEnCarrito()
            actualizarCarrito()

        })
        }
        
    }
    
function restarProducto(){
        const botonRestar= document.getElementsByClassName("restarProducto")
        const restarCantidad=document.getElementsByClassName("restarCantidad")
        
        for (let i = 0; i < botonRestar.length; i++) {
            botonRestar[i].addEventListener("click", ()=>{
            
                let filtrar = carrito.find(e=> e.id == botonRestar[i].id)
            
                filtrar.cantidad--
                restarCantidad.innerHTML+=`${filtrar.cantidad}`
                
                imprimirEnCarrito()
                actualizarCarrito()
                
            })
            }
            
        }
        

function cantidad0() {   
    const boton =document.getElementsByClassName("restarProducto")
    
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click", ()=>{
            
            let filtrar = carrito.find(e=> e.id == boton[i].id)
            
            if (filtrar.cantidad == 0) {
               
                carrito.findIndex (e=> e.id == boton[i].parentNode.id)
                carrito.splice(filtrar,1)
            }
            
            imprimirEnCarrito()
            actualizarCarrito()

        })
        }      
}

function actualizarCarrito() {
    contadorCarrito.innerText= carrito.reduce((acc,el)=> acc+el.cantidad, 0)
    precioTotal.innerText = carrito.reduce((acc,el)=> acc + (el.precio * el.cantidad),0)
}

const eliminarCarrito = ()=>{

    let botonEliminar = document.getElementsByClassName(`eliminarProducto`)
    
    for (let i = 0; i < botonEliminar.length; i++) {
        botonEliminar[i].addEventListener("click", ()=>{
        
        
        let filtrar = carrito.findIndex (e=> e.id == botonEliminar[i].parentNode.id)
        carrito.splice(filtrar,1)
        

        Toastify({
            text: "❌Producto eliminado",
            className: "info",
            offset:{
                y: "150",
            },
            
            style: {
            background: "#e70000",
            }
        }).showToast();
        imprimirEnCarrito()
        actualizarCarrito()
    })
    
    }   
    localStorage.setItem("carro", JSON.stringify(carrito))

}

vaciarCarrito.addEventListener("click", ()=>{

    carrito=[]
    Toastify({
        text: "Carrito Vacio",
        className: "info",
        offset:{
            y: "150",
        },
        
        style: {
        background: "#e70000",
        }
    }).showToast();
    contenedorCarrito.innerHTML=`
        <p>El carrito esta vacio</p>`
    
    actualizarCarrito()
    localStorage.setItem("carro", JSON.stringify(carrito))
})


    finalizarCompra.addEventListener("click", ()=>{

        if (carrito == "") {
            Toastify({
                text: "Error, no seleccionaste ningun producto",
                className: "info",
                offset:{
                    y: "150",
                },
                
                style: {
                background: "#e70000",
                }
            }).showToast();
        }
        else{
        Toastify({
            text: "Compra realizada con exito",
            className: "info",
            offset:{
                y: "150",
            },
            
            style: {
            background: "rgb(0, 196, 26)",
            }
        }).showToast();
        carrito=[]
        contenedorCarrito.innerHTML=`
        <p>El carrito esta vacio</p>`

        precioTotal.innerHTML= "0"

        actualizarCarrito()
        localStorage.setItem("carro", JSON.stringify(carrito))
    }
        
    })





