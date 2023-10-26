
//Creamos un objeto llamado "camara" para desplazar el cielo en función de la posición del jugador.
let camara ={ 
    elemento: document.getElementById("cielo"),
    margenIzquierdo: 0,
    margenDerecho: 100,
 
    avanzar: function (){
        let desplazamiento = 0;

        this.margenIzquierdo +=50;
        desplazamiento = this.margenIzquierdo * -1;

        this.elemento.style.left = desplazamiento + "%";
    },

    retroceder: function(){
        let desplazamiento = 0;

        this.margenIzquierdo -=50;
        desplazamiento= this.margenIzquierdo * -1;

        this.elemento.style.left = desplazamiento + "%";
    }

    }
    