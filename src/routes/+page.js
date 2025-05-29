// SvelteKit load function to fetch a list of pokemon
import { error } from '@sveltejs/kit';
export async function load({ fetch }) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { pokemon: data.results };
    } catch (err) {
        console.error('Failed to fetch pokemon:', err);
        throw error(500, 'Failed to load pokemon data');
    }
}
