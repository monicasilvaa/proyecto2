//Definimos las constantes:
const flechaIzquierda = 37; //Código de tecla para la flecha izquierda.
const flechaDerecha = 39; //Código de tecla para la flecha derecha.
const flechaArriba = 38; //Código de tecla para la flecha de arriba.
const jugador = document.getElementById("jugador"); //Obtenemos la referencia al elemento del jugador en el DOM. 
const altura_salto = 50;

let frame = 0; //Inicializa el contador de frames para la animacion.
let animacionEnProgreso = false; //Variable que indica si la animación está en progreso.
let leftJugador = 0; //Variable para almacenar la posición izquierda del jugador.
let estaSaltando = false;
let direccionSalto = "arriba";
let bottomJugador = jugador.style.bottom || 0;
let teclasPresionadas = {};

//Función que se ejecuta cuando se presiona una tecla
function iniciarAnimacion(evento) {
    const keyCode = evento.which || evento.keyCode; //Obtenemos el código de la tecla presionada
    teclasPresionadas[keyCode] = true;
//verificamos si la animación no esta en progreso y si se presionó la tecla izquierda
    if (keyCode === flechaIzquierda && !animacionEnProgreso) {
        animacionEnProgreso = true;
        jugador.style.transform = "scaleX(1)"; //Giramos la imagen del jugador hacia la izquierda
        animar(keyCode); //Inicia la animación
    } else if (keyCode === flechaDerecha && !animacionEnProgreso) {
        animacionEnProgreso = true;
        jugador.style.transform = "scaleX(-1)"; //Giramos la imagen del jugador hacia la derecha
        animar(keyCode);
    } else if (keyCode === flechaArriba && !estaSaltando){
        estaSaltando = true;
        saltar();
    }
}

//Función paraa detener la animación
function pararAnimacion(evento) {
    const keyCode = evento.which || evento.keyCode;
    delete teclasPresionadas[keyCode];

    if(comprobarPararAnimacion()){
        animacionEnProgreso = false;
        jugador.className = "mario"; // Restaura la clase mario cuando se detiene
    }
}

function comprobarPararAnimacion(){
    return(!estaSaltando && animacionEnProgreso && Object.keys(teclasPresionadas).length === 0);        

}

//Función para animar al jugador
function animar(direction) {
    if (comprobarPararAnimacion()){
        animacionEnProgreso = false;
        jugador.className = "mario"; //Restaura la clase de mario cuando se deteiene.
    }

    if (animacionEnProgreso) {
        jugador.classList.remove("correr-" + frame); //Elimina la clase CSS del frame actual
        // Verifica la dirección y la posicion del jugador
        if (direction === flechaIzquierda && leftJugador > 0) {
            leftJugador -= 1; //Mueve el jugador a la izquierda
        }
        if (direction === flechaDerecha && leftJugador < 50) {
            leftJugador += 1; //Mueve el jugador a la derecha
        }
        frame = (frame + 1) % 3; // Ciclo de 0 a 2 para cambiar de frames
        jugador.style.left = leftJugador + "%"; //Actualiza la posición izquierda del jugador
        jugador.classList.add("correr-" + frame); //Añade la clase de CSS del nuevo frame
        // Utiliza setTimeout para continuar la animación
        setTimeout(function() {
            requestAnimationFrame(animar(direction));
        }, 1000 / 20); //Controla la velocidad de la animación
    }
}

function saltar(){
    if (estaSaltando) {
        jugador.classList.add("saltar");
        if(bottomJugador < altura_salto && direccionSalto == "arriba")
        {
            bottomJugador +=10;
            if(bottomJugador == altura_salto){
                direccionSalto = "abajo";
            }
        }else if (bottomJugador > 0 && direccionSalto == "abajo"){
            bottomJugador -=10;
        }else if (bottomJugador == 0 && direccionSalto == "abajo"){
            direccionSalto = "arriba";
            jugador.classList.remove("saltar");
            estaSaltando = false;
        }

        jugador.style.bottom = bottomJugador + "%";

        //Espera un momento y luego regresa a la posición original
        setTimeout(function () {
            requestAnimationFrame(saltar);
        }, 1000 / 20);
    }
}