var x;
var y;
var xfinal;
var yfinal;
var juegoTerminado = false;


var mapa = [
    "******************",
    "*________B*______*",
    "*_*****_____******",
    "*______***__*__*_*",
    "***_*____*____**_*",
    "*___*____**__*___*",
    "*_********__**_*_*",
    "*____*_____B*__*_*",
    "*_**_*__*****_**_*",
    "*o*__*_______B**W*",
    "******************"
];

var mapita = [];
for (var i = 0; i < mapa.length; i++) {
    mapita[i] = [];
    for (var j = 0; j < mapa[0].length; j++) {
        mapita[i][j] = mapa[i][j];
    }
}

var mapa2 = [
    "****************",
    "*______________*",
    "*______________*",
    "*______________*",
    "*______________*",
    "*______________*",
    "*______________*",
    "*______________*",
    "*______________*",
    "****************"
];

var mapit = [];
for (var i = 0; i < mapa2.length; i++) {
    mapit[i] = [];
    for (var j = 0; j < mapa2[0].length; j++) {
        mapit[i][j] = mapa2[i][j];
    }
}

function generarMapa(mapita, imagen) {
    laberinto.innerHTML = '';
    var tabla = document.createElement('table');
    tabla.setAttribute("class", "celda");
    for (var i = 0; i < mapita.length; i++) {
        var fila = document.createElement('tr');
        for (var j = 0; j < mapita[i].length; j++) {
            var celda = document.createElement('td');
            if (mapita[i][j] == '*') {
                celda.setAttribute("class", "pared");
            } else if (mapita[i][j] == 'o') {
                x = j;
                y = i;
                celda.setAttribute("class", imagen);
            } else if (mapita[i][j] == 'W') {
                xfinal = j;
                yfinal = i;
                celda.setAttribute("class", "final");
            } else if (mapita[i][j] == 'B') {
                celda.setAttribute("class", "bono");
                
            }
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    laberinto.appendChild(tabla);

    // Verifica si el jugador ha llegado a la meta
    if (x == xfinal && y == yfinal) {
        juegoTerminado = true;
        clearInterval(temporizadorInterval); // Detener el temporizador
        
        var tabla2 = document.createElement('table');
        tabla2.setAttribute("class", "fondo");
        for (var i = 0; i < mapit.length; i++) {
            var fila = document.createElement('tr');
            for (var j = 0; j < mapit[i].length; j++) {
                var celda = document.createElement('td');
                if (mapit[i][j] == '*') {
                    celda.setAttribute("class", "muros");
                }
                fila.appendChild(celda);
            }
            tabla2.appendChild(fila);
        }
        laberinto.appendChild(tabla2);
        laberinto.replaceChild(tabla2, laberinto.firstChild);
    }
}


generarMapa(mapita, 'derecha');

arriba.onclick = function() {
    if(!juegoTerminado){
        moverJugador(x, y - 1, 'arriba');  
    }
}

derecha.onclick = function() {
    if(!juegoTerminado){
        moverJugador(x + 1, y, 'derecha');
    } 
}

izquierda.onclick = function() {
    if(!juegoTerminado){
        moverJugador(x - 1, y, 'izquierda'); 
    }
}

abajo.onclick = function() {
    if(!juegoTerminado){
        moverJugador(x, y + 1, 'abajo');  
    }
}

reinicio.onclick =function(){
    moverJugador(x=0,y=0, 'derecha');
}


function moverJugador(nuevaX, nuevaY, direccion) {
    if (mapita[nuevaY][nuevaX] != '*') {
        if (mapita[nuevaY][nuevaX] == 'B') {
            tiempoRestante += 1; 
        }
        
        mapita[y][x] = '_'; // Dejar espacio vacío
        x = nuevaX; // Actualizar posición x
        y = nuevaY; // Actualizar posición y
        mapita[y][x] = 'o'; // Actualizar nueva posición
        generarMapa(mapita, direccion); // Volver a generar el mapa con la imagen de dirección
    }
}


// Mover con teclado
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if(!juegoTerminado){
              moverJugador(x, y - 1, 'arriba');  
            } 
            
            break;
        case 'ArrowRight':
            if(!juegoTerminado){
                moverJugador(x + 1, y, 'derecha');
            } 
            
            break;
        case 'ArrowLeft':
            if(!juegoTerminado){
                moverJugador(x - 1, y, 'izquierda'); 
            } 
            break;
        case 'ArrowDown':
            if(!juegoTerminado){
              moverJugador(x, y + 1, 'abajo');  
            } 
            break;
    }
});

reinicio.onclick = function() {
    reiniciarJuego();
};



/* TEMPORIZADOR */


var tiempoRestante = 20; // Tiempo en segundos
var temporizadorInterval;

// Iniciar el temporizador
function iniciarTemporizador() {
    tiempoRestante = 20; // Reiniciar el tiempo
    document.getElementById('tiempo').innerText = tiempoRestante; // Mostrar el tiempo

    temporizadorInterval = setInterval(function() {
        tiempoRestante--;
        document.getElementById('tiempo').innerText = tiempoRestante; // Actualizar el tiempo mostrado
        
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval); // Detener el temporizador
            showAlert("¡Se acabó el tiempo! Reiniciando el juego...");
            reiniciarJuego(); // Llamar a la función para reiniciar el juego
        }
    }, 1000);
}

// Reiniciar el juego
function reiniciarJuego() {
    // Lógica de reinicio existente
    x = 1; // Posición inicial x
    y = 9; // Posición inicial y
    juegoTerminado = false; // Reiniciar estado del juego

    // Limpiar la posición anterior del jugador
    for (var i = 0; i < mapita.length; i++) {
        for (var j = 0; j < mapita[i].length; j++) {
            if (mapita[i][j] == 'o') {
                mapita[i][j] = '_'; // Limpiar posición anterior del jugador
            }
        }
    }

    mapita[y][x] = 'o'; // Colocar al jugador en la posición inicial
    generarMapa(mapita, 'derecha'); // Regenerar el mapa
    iniciarTemporizador(); // Reiniciar el temporizador
}

function showAlert(message) {
    const alertElement = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
   
    alertMessage.textContent = message;
    alertElement.style.display = "block";
}

function closeAlert() {
    const alertElement = document.getElementById("customAlert");
    alertElement.style.display = "none";
}

 
iniciarTemporizador();
