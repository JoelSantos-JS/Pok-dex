const pokemonName = document.querySelector('.pokemon__text')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon-image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
let searchPokemon = 1;

  
async  function fechPokemon(pokemon) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let json = await response.json()
 

        return json
}



const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ...'
    const data = await fechPokemon(pokemon)

    setTimeout(() => {
        if(data) {
            pokemonName.innerHTML = `${data.name}`
            pokemonNumber.innerHTML = `${data.id} - `
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'].front_default
            input.value= ''
            searchPokemon = data.id
            } else {
                pokemonName.innerHTML = 'Not Found';
                pokemonNumber.innerHTML = '';
            }
    }

    , 700)

 
}

form.addEventListener('submit' , (event) => {
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())
    
})

btnPrev.addEventListener('click' , () => {

    if( searchPokemon > 1) {
 searchPokemon -=1
 renderPokemon(searchPokemon)

    }
})

btnNext.addEventListener('click' , () => {
 searchPokemon += 1
 renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon)

