const pokeForm = document.querySelector(".poke-form")
const pokeList = document.querySelector(".poke-list")

function addPokemon(pokemon) {
  const liEl = document.createElement("li")
  const imgEl = document.createElement("img")
  const h2El = document.createElement("h2")
  const buttonEl = document.createElement("button")
  const buttonElTwo = document.createElement("button")

  buttonEl.addEventListener("click", function() {
    fetch("http://localhost:3000/pokemons/" + pokemon.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    })

})

buttonElTwo.addEventListener("click", function() {
  fetch("http://localhost:3000/pokemons/" + pokemon.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({like: 'YEAH BOI'}),
  })

})

buttonElTwo.addEventListener("click", function() {
  console.log("click")
})

liEl.classList.add("pokemon")

imgEl.src = pokemon.image

h2El.innerText = pokemon.name

buttonEl.innerText = ("REMOVE")
buttonElTwo.innerText = ("LIKE")

liEl.append(imgEl, h2El, buttonEl, buttonElTwo)
pokeList.append(liEl)
}

function addPokemons(pokemons) {
  console.log(pokemons)
  pokemons.forEach((pokemon) => addPokemon(pokemon))
}

function listenToAddPokemonForm() {
  pokeForm
    .addEventListener("submit", function (event) {
      event.preventDefault()
      const pokemon = {
        name: pokeForm.name.value,
        image: pokeForm.image.value,
      }

      // CREATE
      fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemon),
      })

      pokeForm.reset()
      .then((res) => res.json())
     .then((pokemon) => addPokemon(pokemon))
    })
    
}

function init() {
  listenToAddPokemonForm()

  // READ
  fetch("http://localhost:3000/pokemons")
    .then((res) => res.json())
    .then((pokemons) => addPokemons(pokemons))
}

init()
