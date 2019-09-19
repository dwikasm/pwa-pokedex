import Http from './http.class';

const pokeClient = new Http({
  headers: {
    'Content-Type': 'application/json',
  },
});

const pokeEndpoints = {
  detail: 'https://pokeapi.co/api/v2/pokemon',
};

export function getPokemon(pokemonName) {
  return new Promise((resolve, reject) => {
    pokeClient.get(`${pokeEndpoints.detail}/${pokemonName}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          throw response;
        }
      })
      .catch(() => {
        reject(new Error('Pokemon not found.'));
      });
  });
}
