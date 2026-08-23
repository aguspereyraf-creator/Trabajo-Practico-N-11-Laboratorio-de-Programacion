const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

const puntosTexto = document.getElementById("puntos");
const vidasTexto = document.getElementById("vidas");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("iniciar");

let puntos = 0;
let vidas = 5;
let jugando = false;

let teclaIzquierda = false;
let teclaDerecha = false;


// Jugador

let jugador = {
    x: 270,
    y: 350,
    ancho: 60,
    alto: 30,
    velocidad: 7
};


// Objeto que cae

let objeto = {
    x: 100,
    y: 0,
    tamaño: 30,
    velocidad: 3
};


// Detectar teclas

document.addEventListener("keydown", function(evento) {

    if (evento.key == "ArrowLeft") {
        teclaIzquierda = true;
    }

    if (evento.key == "ArrowRight") {
        teclaDerecha = true;
    }

});


document.addEventListener("keyup", function(evento) {

    if (evento.key == "ArrowLeft") {
        teclaIzquierda = false;
    }

    if (evento.key == "ArrowRight") {
        teclaDerecha = false;
    }

});


// Empezar juego

boton.addEventListener("click", function() {

    puntos = 0;
    vidas = 5;

    jugador.x = 270;

    jugando = true;

    mensaje.textContent = "";

    nuevoObjeto();

    juego();

});


// Crear un nuevo objeto

function nuevoObjeto() {

    objeto.x = Math.random() * (canvas.width - objeto.tamaño);
    objeto.y = 0;

}


// Actualizar el juego

function actualizar() {

    // Movimiento del jugador

    if (teclaIzquierda) {
        jugador.x -= jugador.velocidad;
    }

    if (teclaDerecha) {
        jugador.x += jugador.velocidad;
    }


    // No salir del canvas

    if (jugador.x < 0) {
        jugador.x = 0;
    }

    if (jugador.x > canvas.width - jugador.ancho) {
        jugador.x = canvas.width - jugador.ancho;
    }


    // Movimiento del objeto

    objeto.y += objeto.velocidad;


    // Comprobar si atrapó el objeto

    if (
        objeto.y + objeto.tamaño >= jugador.y &&
        objeto.x < jugador.x + jugador.ancho &&
        objeto.x + objeto.tamaño > jugador.x
    ) {

        puntos++;

        puntosTexto.textContent = puntos;

        nuevoObjeto();
    }


    // Si el objeto llegó abajo

    if (objeto.y > canvas.height) {

        vidas--;

        vidasTexto.textContent = vidas;

        nuevoObjeto();
    }


    // Ganar

    if (puntos >= 10) {

        jugando = false;

        mensaje.textContent = "¡Ganaste! Descongelaste el código.";

    }


    // Perder

    if (vidas <= 0) {

        jugando = false;

        mensaje.textContent = "Perdiste. Los bugs ganaron.";

    }

}


// Dibujar

function dibujar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarJugador();

    dibujarHielo();
}

function dibujarJugador() {

    // Pantalla de la computadora

    ctx.fillStyle = "gray";

    ctx.fillRect(
        jugador.x,
        jugador.y,
        jugador.ancho,
        jugador.alto
    );


    // Pantalla

    ctx.fillStyle = "black";

    ctx.fillRect(
        jugador.x + 8,
        jugador.y + 5,
        jugador.ancho - 16,
        18
    );


    // Código en la pantalla

    ctx.fillStyle = "lime";

    ctx.font = "12px Arial";

    ctx.fillText(
        "</>",
        jugador.x + 20,
        jugador.y + 18
    );


    // Base de la computadora

    ctx.fillStyle = "white";

    ctx.fillRect(
        jugador.x + 15,
        jugador.y + jugador.alto,
        jugador.ancho - 30,
        5
    );
}

function dibujarHielo() {

    ctx.fillStyle = "lightblue";

    ctx.beginPath();

    ctx.moveTo(
        objeto.x + objeto.tamaño / 2,
        objeto.y
    );

    ctx.lineTo(
        objeto.x + objeto.tamaño,
        objeto.y + 10
    );

    ctx.lineTo(
        objeto.x + objeto.tamaño - 5,
        objeto.y + objeto.tamaño
    );

    ctx.lineTo(
        objeto.x + 5,
        objeto.y + objeto.tamaño
    );

    ctx.lineTo(
        objeto.x,
        objeto.y + 10
    );

    ctx.closePath();

    ctx.fill();

    // Línea dentro del hielo

    ctx.strokeStyle = "white";

    ctx.beginPath();

    ctx.moveTo(
        objeto.x + 8,
        objeto.y + 10
    );

    ctx.lineTo(
        objeto.x + 20,
        objeto.y + 25
    );

    ctx.stroke();
}


// Game Loop

function juego() {

    if (!jugando) {
        return;
    }

    actualizar();

    dibujar();

    requestAnimationFrame(juego);

}