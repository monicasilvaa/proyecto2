const flechaDerecha= 39;
const flechaIzquierda= 37;

var jugador = document.getElementById("jugador")

function moverJugador(e){
    var keyCode = e.which || e.keyCode;
    var leftJugador =parseInt(jugador.style.left,10) || 0;

    if(leftJugador > 0 && keyCode === flechaIzquierda){
        leftJugador-=1;
    }
    else if (leftJugador <90 && keyCode === flechaDerecha){
        leftJugador+=1;
    }

    jugador.style.left = leftJugador + "%";
}