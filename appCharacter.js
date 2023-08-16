let $info_character = document.getElementById('info_character');

//Obtener el id
const searchParams = new URLSearchParams(window.location.search);

let character = [];
let id = parseInt(searchParams.get('id'));

//Fetch
function getCharacter(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            character = data;
            mostrar(character);
        });
}
getCharacter(id);


//Volcar la info en la card
function mostrar(character) {
    let listaEpisodes= character.episode.length;
    let text= `<p>`
    for (let i = 0; i < listaEpisodes; i++) {
        text+= `${character.episode[i]}</p>`;
    }
    $info_character.innerHTML = `<div>
        <div class="card_personaje_mas">
        <div class="imagen">
            <figure><img class="imagen_personaje" src=  ${character.image}
            alt=  ${character.name} /></figure>
        </div>
        <div class="datos_personaje_mas">
            <p><b>Nombre:</b> ${character.name} </p>
            <p><b>Género:</b> ${character.gender}</p>
            <p><b>Especie:</b> ${character.species}</p>
            <p><b>Status:</b> ${character.status}</p>
            <p><b>Origen:</b> ${character.origin.name}</p>
            <p><b>Locación:</b> ${character.location.name}</p>
            <p id="episodios"><b>Episodios:</b></p>
            ${text} 
        </div>`;
};


