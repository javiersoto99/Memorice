var contenedorCartas = document.querySelector('.contenedorCartas');
var turnos = document.getElementById("turnos");
var tiempo = document.getElementById("tiempo");
var jugarBtn = document.getElementById("startBtn");
let tiempoValor = 0;
var paresSelect = document.getElementById("paresSelect");
var locked = false;
var primeraCarta, secundaCarta;
var pares = 18;
var simbolos = ['★', '☾', '♥', '☥', '✿', '♫','∞', 'π', '♰', '♁', '✠' ,'§', 'Σ', '✺', '☁', '☂', '☃', '☯', '☮', '✎', '♻', '☻', '♛', '♞', '♣', '↺', 'ϟ', '✂', '✈', '♠', '☠','▲']




window.onload = function onInitialized(){
  generarCartas(18);

  //Tiempo

  //8 pares
  var record8 = `mejoresTiempos${8}pares`;
  var recordsTiempo8 = JSON.parse(localStorage.getItem(record8)) || [];
  
  const table8 = document.querySelector(`#recordsTiempo8pares`);
  const rows8 = table8.querySelectorAll('tr');

  for (let i = 0; i < recordsTiempo8.length; i++) {
    rows8[i + 1].querySelector('td:nth-child(1)').textContent = recordsTiempo8[i].fecha;
    rows8[i + 1].querySelector('td:nth-child(2)').textContent = `${recordsTiempo8[i].tiempo} s`;
  }

  //18 pares
  var record18 = `mejoresTiempos${18}pares`;
  var recordsTiempo18 = JSON.parse(localStorage.getItem(record18)) || [];

  const table18 = document.querySelector(`#recordsTiempo18pares`);
  const rows18 = table18.querySelectorAll('tr');

  for (let i = 0; i < recordsTiempo18.length; i++) {
    rows18[i + 1].querySelector('td:nth-child(1)').textContent = recordsTiempo18[i].fecha;
    rows18[i + 1].querySelector('td:nth-child(2)').textContent = `${recordsTiempo18[i].tiempo} s`;
  }

  //32 pares
  var record32 = `mejoresTiempos${32}pares`;
  var recordsTiempo32 = JSON.parse(localStorage.getItem(record32)) || [];

  const table32 = document.querySelector(`#recordsTiempo32pares`);
  const rows32 = table32.querySelectorAll('tr');

  for (let i = 0; i < recordsTiempo32.length; i++) {
    rows32[i + 1].querySelector('td:nth-child(1)').textContent = recordsTiempo32[i].fecha;
    rows32[i + 1].querySelector('td:nth-child(2)').textContent = `${recordsTiempo32[i].tiempo} s`;
  }

  //Turnos

  //8 pares
  const key8 = `mejoresTurnos${8}pares`;
  const mejoresTurnos8 = JSON.parse(localStorage.getItem(key8)) || [];

  const tableTurnos8 = document.querySelector(`#recordsTurnos8pares`);
  const rowsTurnos8 = tableTurnos8.querySelectorAll('tr');

  for (let i = 0; i < mejoresTurnos8.length; i++) {
    rowsTurnos8[i + 1].querySelector('td:nth-child(1)').textContent = mejoresTurnos8[i].fecha;
    rowsTurnos8[i + 1].querySelector('td:nth-child(2)').textContent = mejoresTurnos8[i].turnosInt;
  }

  //18 pares
  const key18 = `mejoresTurnos${18}pares`;
  const mejoresTurnos18 = JSON.parse(localStorage.getItem(key18)) || [];

  const tableTurnos18 = document.querySelector(`#recordsTurnos18pares`);
  const rowsTurnos18 = tableTurnos18.querySelectorAll('tr');

  for (let i = 0; i < mejoresTurnos18.length; i++) {
    rowsTurnos18[i + 1].querySelector('td:nth-child(1)').textContent = mejoresTurnos18[i].fecha;
    rowsTurnos18[i + 1].querySelector('td:nth-child(2)').textContent = mejoresTurnos18[i].turnosInt;
  }

  //32 pares
  const key32 = `mejoresTurnos${32}pares`;
  const mejoresTurnos32 = JSON.parse(localStorage.getItem(key32)) || [];

  const tableTurnos32 = document.querySelector(`#recordsTurnos32pares`);
  const rowsTurnos32 = tableTurnos32.querySelectorAll('tr');

  for (let i = 0; i < mejoresTurnos32.length; i++) {
    rowsTurnos32[i + 1].querySelector('td:nth-child(1)').textContent = mejoresTurnos32[i].fecha;
    rowsTurnos32[i + 1].querySelector('td:nth-child(2)').textContent = mejoresTurnos32[i].turnosInt;
  }
    
}


function generarCartas(pares) {
  contenedorCartas.innerHTML = "";
  var cantidadCartas = pares * 2;

  var randomSimbolos = simbolos.sort(() => 0.5 - Math.random()).slice(0, pares);

  var paresSimbolos = randomSimbolos.concat(randomSimbolos);

  paresSimbolos.sort(() => 0.5 - Math.random());

  for (let i = 0; i < cantidadCartas; i++) {
    var divCarta = document.createElement("div");
    divCarta.classList.add("carta");
    if(theme == "light"){
      divCarta.innerHTML = '<div class="diseno"><span>?</span><div class="numero">' + (i + 1) + '</div></div><div class="contenido">' + paresSimbolos[i] + '</div>';
    }
    else{
      divCarta.innerHTML = '<div class="diseno darkDiseno"><span>?</span><div class="numero">' + (i + 1) + '</div></div><div class="contenido">' + paresSimbolos[i] + '</div>';
    }
    
    contenedorCartas.appendChild(divCarta);
  }
}


function actualizarTiempo() {
    tiempoValor++;
    tiempo.textContent = 'Tiempo: '+ tiempoValor + ' s';
}


//Iniciar el juego

jugarBtn.addEventListener("click", () => {

  jugarBtn.classList.add("disabled");
  paresSelect.classList.add("disabled");

  tiempoValor = 0;
  turnos.textContent = "Turnos: 0";
  tiempo.textContent = "Tiempo: 0 s";
  locked = false;
  primeraCarta = null;
  secundaCarta = null;

  //Generar cartas
  generarCartas(pares);

  //Iniciar tiempo
  const intervalId = setInterval(actualizarTiempo, 1000);

  //Agregar click a cartas
  const cartas = document.querySelectorAll(".carta");

  cartas.forEach((carta) => {
    carta.addEventListener("click", () => {
      if (locked) return;

      
      if (primeraCarta !== null && secundaCarta !== null) return;

      carta.classList.toggle("flip");

      if (primeraCarta === null) {
        primeraCarta = carta;
        return;
      }

      secundaCarta = carta;

      turnos.textContent = "Turnos: " + (parseInt(turnos.textContent.split(":")[1]) + 1);

      if (primeraCarta.querySelector(".contenido").textContent === secundaCarta.querySelector(".contenido").textContent) {
        primeraCarta.classList.add("locked");
        secundaCarta.classList.add("locked");
        primeraCarta = null;
        secundaCarta = null;

        //Detener el juego
        const paresCartas = document.querySelectorAll(".locked");
        if (paresCartas.length === cartas.length) {

          guardarMejoresTiempos(tiempoValor, pares);  
          guardarMejoresTurnos(turnos, pares);

          jugarBtn.classList.remove("disabled");
          paresSelect.classList.remove("disabled");
          
          clearInterval(intervalId);
          
        }


      } else {
        //Si no son iguales, dejarlas boca abajo y bloquear el juego
        locked = true;
        setTimeout(() => {
          primeraCarta.classList.toggle("flip");
          secundaCarta.classList.toggle("flip");
          primeraCarta = null;
          secundaCarta = null;
          locked = false;
        }, 1000);
      }
    });
  });

  
});


//Seleccionar Cantidad de Pares

paresSelect.addEventListener("change", () => {
    var selectedValue = paresSelect.value;
    pares = selectedValue;
    generarCartas(selectedValue);
});

//Local Storage Modo Oscuro
let savedTheme = localStorage.getItem("theme");
let theme = savedTheme || "light";


//Modo Oscuro

const changeTheme = document.getElementById("ChangeTheme");

if (theme === "dark") {
  changeTheme.checked = true;
  var body = document.querySelector("body");
  const contenedor = document.querySelector(".contenedor");
  var disenos = document.querySelectorAll(".carta .diseno");
  var datosPartida = document.querySelector(".datosPartida");

  body.classList.add("dark");
  contenedor.classList.add("darkContenedor");
  datosPartida.classList.add("datosPartidaDark");
  disenos.forEach((diseno) => diseno.classList.add("darkDiseno"));
}

changeTheme.addEventListener("change", function () {
  theme = changeTheme.checked ? "dark" : "light";
  localStorage.setItem("theme", theme);

  var body = document.querySelector("body");
  const contenedor = document.querySelector(".contenedor");
  var disenos = document.querySelectorAll(".carta .diseno");
  var datosPartida = document.querySelector(".datosPartida");

  if (theme === "dark") {
    body.classList.add("dark");
    contenedor.classList.add("darkContenedor");
    datosPartida.classList.add("datosPartidaDark");
    disenos.forEach((diseno) => diseno.classList.add("darkDiseno"));
  } else {
    body.classList.remove("dark");
    contenedor.classList.remove("darkContenedor");
    datosPartida.classList.remove("datosPartidaDark");
    disenos.forEach((diseno) => diseno.classList.remove("darkDiseno"));
  }

  if (theme === "dark") {
    changeTheme.checked = true;
  } else {
    changeTheme.checked = false;
  }
});


//Records

function guardarMejoresTiempos(tiempo, pares) {
  const key = `mejoresTiempos${pares}pares`;
  const mejoresTiempos = JSON.parse(localStorage.getItem(key)) || [];

  if (mejoresTiempos.length < 3 || tiempo < mejoresTiempos[2].tiempo) {
    const fecha = new Date().toLocaleDateString();
    mejoresTiempos.push({ tiempo, fecha });
    mejoresTiempos.sort((a, b) => a.tiempo - b.tiempo);
    mejoresTiempos.splice(3);

    const table = document.querySelector(`#recordsTiempo${pares}pares`);
    const rows = table.querySelectorAll('tr');

    for (let i = 0; i < mejoresTiempos.length; i++) {
      rows[i + 1].querySelector('td:nth-child(1)').textContent = mejoresTiempos[i].fecha;
      rows[i + 1].querySelector('td:nth-child(2)').textContent = `${mejoresTiempos[i].tiempo} s`;
    }

    localStorage.setItem(key, JSON.stringify(mejoresTiempos));
  }
}

function guardarMejoresTurnos(turnos, pares) {
  var turnosInt = parseInt(turnos.textContent.split(':')[1])
  const key = `mejoresTurnos${pares}pares`;
  const mejoresTurnos = JSON.parse(localStorage.getItem(key)) || [];

  if (mejoresTurnos.length < 3 || turnosInt < mejoresTurnos[2].turnosInt) {
    const fecha = new Date().toLocaleDateString();
    mejoresTurnos.push({ turnosInt, fecha });
    mejoresTurnos.sort((a, b) => a.turnosInt - b.turnosInt);
    mejoresTurnos.splice(3);

    const tableTurnos = document.querySelector(`#recordsTurnos${pares}pares`);
    const rowsTurnos = tableTurnos.querySelectorAll('tr');

    for (let i = 0; i < mejoresTurnos.length; i++) {
      rowsTurnos[i + 1].querySelector('td:nth-child(1)').textContent = mejoresTurnos[i].fecha;
      rowsTurnos[i + 1].querySelector('td:nth-child(2)').textContent = mejoresTurnos[i].turnosInt;
    }

    localStorage.setItem(key, JSON.stringify(mejoresTurnos));
  }
}



