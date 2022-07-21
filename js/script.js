const pokeName = document.querySelector('.poke-name');
const pokeNumber = document.querySelector('.poke-numero');
const pokeImage = document.querySelector('.poke-img');

const pokeForm = document.querySelector('.form');
const input = document.querySelector('.pesquisa');
const botaoPrev = document.querySelector('.btn-prev');
const botaoNext = document.querySelector('.btn-next');

let pesquisaPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResposta.status === 200){
        const data = await APIResposta.json();
        return data;
    }

    
}

const renderPokemon = async (pokemon) =>{
    pokeName.innerHTML = 'Loading...'
    pokeNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
     pokeImage.style.display = 'block';
     pokeName.innerHTML = data.name;
     pokeNumber.innerHTML = data.id;
     pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
     input.value = '';
     pesquisaPokemon = data.id;
    }else{
        pokeImage.style.display = 'none';
        pokeName.innerHTML = 'Not found :c';
        pokeNumber.innerHTML = '';
    }

}


pokeForm.addEventListener('submit', (event)=> {
    event.preventDefault();  
    renderPokemon(input.value.toLowerCase())
});

botaoPrev.addEventListener('click', (event)=> {
    if(pesquisaPokemon > 1){
        pesquisaPokemon -= 1;
        renderPokemon(pesquisaPokemon)
    }
    
      
});
botaoNext.addEventListener('click', (event)=> {
    pesquisaPokemon += 1;
    renderPokemon(pesquisaPokemon)
      
});


renderPokemon(pesquisaPokemon);