let $info_personaje = document.getElementById('info_personaje');

let $todos = document.getElementById('todos');
let $mujer = document.getElementById('mujer');
let $hombre = document.getElementById('hombre');
let $sinGenero = document.getElementById('sinGenero');
let $desconocido = document.getElementById('desconocido');


let $total_personajes = document.getElementById('total_personajes');
let $pagina_actual = document.getElementById('pagina_actual');
let $total_paginas = document.getElementById('total_paginas');

let $first = document.getElementById('first');
let $next_page = document.getElementById('next_page');
let $previous_page = document.getElementById('previous_page');
let $last = document.getElementById('last');

let personajes = [];
let pagina = 1;
let total = 0;

//Fetch
function fetcheando(pagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            personajes = data.results;
            mostrar(personajes);
            total = data.info.pages;
            pagTotal(total);
        });
}
fetcheando(pagina);


//Volcar la info en la página
function mostrar(personajes) {
    $info_personaje.innerHTML = '';
    $total_personajes.innerHTML = personajes.length;
    for (let i = 0; i < personajes.length; i++) {
        $info_personaje.innerHTML += `<div>
        <div class="card_personaje">
            <div class="imagen">
                <figure><img class="imagen_personaje" src=  ${personajes[i].image}
                    alt=  ${personajes[i].name} /></figure>
            </div>
            <div class="datos_personaje">
                <p><b>Nombre:</b> ${personajes[i].name} </p>
                <p><b>Género:</b> ${personajes[i].gender}</p>
                <p><b>Especie:</b> ${personajes[i].species}</p>
                <p><b>Status:</b> ${personajes[i].status}</p>
                <p><b>Origen:</b> ${personajes[i].origin.name}</p>
                <p><b>Locación:</b> ${personajes[i].location.name}</p>
            </div>
            <div class="mas_info_personaje">
                <p id="verMas"><a class="footer_personaje" href="characterDetail.html?id=${personajes[i].id}" target="_blank">Ver más...</a></p>
            </div>
        </div>
    </div>`
    }
    $pagina_actual.innerHTML = pagina;
};

function pagTotal(total) {
    $total_paginas.innerHTML = total;
};


//Filtros de géneros
function todos() {
    let mostrarTodos = personajes
    mostrar(mostrarTodos)
};

function mujeres() {
    let mostrarMujeres = personajes.filter((personaje) => {
        return personaje.gender === 'Female';
    })
    mostrar(mostrarMujeres)
};

function hombres() {
    let mostrarHombres = personajes.filter((personaje) => {
        return personaje.gender === 'Male';
    })
    mostrar(mostrarHombres)
};

function sinGeneros() {
    let mostrarSinGeneros = personajes.filter((personaje) => {
        return personaje.gender === 'Genderless';
    })
    mostrar(mostrarSinGeneros)
};

function desconocidos() {
    let mostrarDesconocidos = personajes.filter((personaje) => {
        return personaje.gender === 'unknown';
    })
    mostrar(mostrarDesconocidos)
};

//Pagination
function firstPage() {
    if (pagina <= 1) {
        firstPage.disabled = true;
    }
    else {
        firstPage.disabled = false;
        fetcheando(1);
        pagina = 1;
    }
};

function lastPage() {
    if (pagina === total) {
        lastPage.disabled = true;
    } else {
        lastPage.disabled = false;
        fetcheando(total);
        pagina = 42;
    }
};

function nextPage() {
    if (pagina === total) {
        nextPage.disabled = true;
    } else {
        nextPage.disabled = false;
        pagina += 1;
        fetcheando(pagina);
    }
};

function previousPage() {
    if (pagina <= 1) {
        previousPage.disabled = true;
    }
    else {
        previousPage.disabled = false;
        pagina -= 1;
        fetcheando(pagina);
    }
};



//Eventos
$todos.addEventListener('click', todos);
$mujer.addEventListener('click', mujeres);
$hombre.addEventListener('click', hombres);
$desconocido.addEventListener('click', desconocidos);
$sinGenero.addEventListener('click', sinGeneros);

$first.addEventListener('click', firstPage);
$next_page.addEventListener('click', nextPage);
$previous_page.addEventListener('click', previousPage);
$last.addEventListener('click', lastPage);

