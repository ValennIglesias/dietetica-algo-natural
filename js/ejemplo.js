const nombre = document.getElementById("nombre").value
const edad = document.getElementById("edad").value
const genero = document.getElementById("genero").value



const btn = document.getElementById("ingresar")
btn.addEventListener("click", revisarGenero)

function revisarGenero(){
    genero.value == "F" ? femenino() :  masculino()
}

function femenino(){
    edad >= 60 ? console.log("Se puede jubilar") : console.log("No se puede jubilar, te faltan " + (60 - edad) + " años")
}
function masculino(){
    edad >= 65 ? console.log("Se puede jubilar") : console.log("No se puede jubilar, te faltan " + (65 - edad) + " años")
}


let mansi =[
    {Jugador: "Mansi", Apellido: "Mansilla"}
]