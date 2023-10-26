let consola = {
    encendido: false,
    personajeSeleccionado: 0,
    encenderApagar: function (){
        if (this.encendido){
            this.encendido = false;
            document.getElementById("pantallaApagada").style.display = "flex";
            document.getElementById("pantallaEncendida").style.display = "none";
            document.getElementById("seleccionPersonaje").style.display = "none";
            document.getElementById("pantalla").style.display = "none";

            this.pararMusicaPartida();
            this.pararVideoIntro();
            leftJugador = 0;
        }else {
            let video = document.getElementById("videoIntro");
            
            this.encendido = true;
            document.getElementById("pantallaEncendida").style.display = "flex";
            video.addEventListener("ended", function(){
                document.getElementById("pantallaEncendida").style.display = "none";
                document.getElementById("pantallaApagada").style.display = "none";
                document.getElementById("seleccionPersonaje").style.display = "flex";
            });
            video.play();
        }
    },
    seleccionarPersonaje: function(indice){
        let pantallaSeleccionPersonaje = document.getElementById("seleccionPersonaje");
        if(window.getComputedStyle(pantallaSeleccionPersonaje).display != "none"){
            let personajes = document.getElementsByClassName("personaje");
            personajes[this.personajeSeleccionado].classList.remove("borde");
            this.personajeSeleccionado += indice;
            if(this.personajeSeleccionado > 2){
                this.personajeSeleccionado = 0;
            } else if (this.personajeSeleccionado <0){
                this.personajeSeleccionado =2;
            }
            personajes[this.personajeSeleccionado].classList.add("borde");
        }
    },
    aceptarPersonaje: function() {
        let pantallaSeleccionPersonaje = document.getElementById("seleccionPersonaje");
        if(window.getComputedStyle(pantallaSeleccionPersonaje).display != "none"){
            let personajes = document.getElementsByClassName("personaje");
            let personaje = personajes[this.personajeSeleccionado].firstElementChild.cloneNode(true);
            let jugador = document.getElementById("jugador");
            let cielo = document.getElementById("cielo");
            let pantallaSeleccion = document.getElementById("seleccionPersonaje");

            if(jugador !== null)
            {
                jugador.remove();
            }

            personaje.setAttribute('id', 'jugador');

            cielo.append(personaje);
        
            pantallaSeleccion.style.display = "none";
            this.iniciarPartida();
        }
    }, 
    iniciarPartida: function() {
        jugador = document.getElementById("jugador");
        clasesInicialesJugador = jugador.className;
        document.getElementById("pantalla").style.display = "flex";
        this.anadirMusicaPartida();        
    },
    anadirMusicaPartida: function() {
        let html = `<embed id="musica" loop="true" src="audio/musica_fondo.mp3" hidden="true" autoplay></embed>`;
        document.getElementById("pantalla").insertAdjacentHTML( 'beforeend',html);
    },
    pararMusicaPartida: function() {
        if(document.getElementById("musica") !== null)
        {
            document.getElementById("musica").remove();
        }
    },
    pararVideoIntro: function() {
        let video = document.getElementById("videoIntro");

        video.pause();
        video.currentTime = 0;
    }

}