export default {
  namespaced: true,
  state: {
    pokemonInfo: null,
    pokemonColor: [247, 248, 251],
  },
  mutations: {
    set_pokemon(state, pokemonParam) {
      state.pokemonInfo = pokemonParam;
    },
    set_color(state, color) {
      state.pokemonColor = color;
    },
  },
};
