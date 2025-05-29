<script>
    let {data} = $props(); // This is the list of fetched pokemon; it comes from the +page.js file

    // Since these are reactive, they will update when the user selects different pokemon
    let selectedPokemon1 = $state();
    let selectedPokemon2 = $state();

    // When two pokemon are selected, fetch and show them (this function is called in the await blocks below)
    async function fetchPokemonData(pokemonName) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
</script>

<!-- Two drop down boxes to compare two pokemon -->
<select bind:value={selectedPokemon1}> <!-- The bind:value part is going to update the reactive selectedPokemon1 variable -->
    <option value="" disabled selected>Select a Pokémon</option>
    {#each data.pokemon as pokemon}
        <option value={pokemon.name}>{pokemon.name}</option>
    {/each}
</select>

<select bind:value={selectedPokemon2}> <!-- The bind:value part is going to update the reactive selectedPokemon2 variable -->
    <option value="" disabled selected>Select a Pokémon</option>
    {#each data.pokemon as pokemon}
        <option value={pokemon.name}>{pokemon.name}</option>
    {/each}
</select>

<!-- This will update when the value of one of the reactive variables changes -->
{#if selectedPokemon1 && selectedPokemon2}
    <div>
        <h2>Comparing {selectedPokemon1} and {selectedPokemon2}</h2>
        <div class="pokemon-data">
            <div class="pokemon" id="pokemon1">
                <h3>{selectedPokemon1}</h3>
                <!-- Fetch and display the first pokemon's data -->
                <!-- https://svelte.dev/tutorial/svelte/await-blocks -->
                {#await fetchPokemonData(selectedPokemon1)}
                    <p>Loading...</p>
                {:then pokemonData1}
                    <img src={pokemonData1.sprites.front_default} alt={pokemonData1.name} />
                    <p>Height: {pokemonData1.height}</p>
                    <p>Weight: {pokemonData1.weight}</p>
                {/await}
            </div>
            <div class="pokemon" id="pokemon2">
                <h3>{selectedPokemon2}</h3>
                <!-- Fetch and display the second pokemon's data -->
                {#await fetchPokemonData(selectedPokemon2)}
                    <p>Loading...</p>
                {:then pokemonData2}
                    <img src={pokemonData2.sprites.front_default} alt={pokemonData2.name} />
                    <p>Height: {pokemonData2.height}</p>
                    <p>Weight: {pokemonData2.weight}</p>
                {/await}
            </div>
        </div>
    </div>
{/if}

<style>
    .pokemon-data {
        display: flex;
        margin-top: 20px;
        gap: 20px;
    }
    /* Put each pokemon on a card */
    .pokemon {
        border: 1px solid #ccc;
        padding: 1em;
        border-radius: 5px;
        text-align: center;
    }
    h3 {
        text-transform: capitalize;
    }
    select {
        margin: 10px;
        padding: 5px;
        font-size: 16px;
    }
    * {
        font-family: Arial, sans-serif;
    }
</style>