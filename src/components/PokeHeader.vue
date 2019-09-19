<template>
  <div class="poke-header">
    <div class="poke-logo">
      <img class="poke-logo__image"
          src="https://myrealdomain.com/images/pokeball-icon-7.png" alt="poke-icon">
    </div>
    <div class="poke-search">
      <input class="poke-search__input" type="text"
        v-model.trim="pokemonName" :disabled="isSearching"
        @keypress.enter="searchHandler(pokemonName)"/>
      <button class="poke-search__button" @click="searchHandler(pokemonName)">
        <template v-if="isSearching">searching...</template>
        <template v-else>search</template>
      </button>
    </div>
  </div>
</template>

<script>
import * as pokeService from '@/services/poke.service';

export default {
  name: 'PokeHeader',
  data() {
    return {
      pokemonName: '',
      isSearching: false,
    };
  },
  methods: {
    searchHandler(pokemonName) {
      const self = this;
      if (self.validate(pokemonName)) {
        self.isSearching = true;
        pokeService.getPokemon(pokemonName.toLowerCase())
          .then((response) => {
            self.$store.commit('pokemon/set_pokemon', response);
          })
          .catch((error) => {
            alert(error.message || error);
          })
          .finally(() => {
            self.isSearching = false;
          });
      }
    },
    validate(pokemonName) {
      if (pokemonName === undefined || pokemonName === '') {
        alert('Please enter valid pokemon name.');
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.poke-header {
  width: 100%;
  height: 70px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: $color-primary;
  border-bottom: 2px solid white; // hehe
}
.poke-logo {
  flex: 0 1 70px;
  text-align: center;

  &__image {
    height: 64px;
    width: 64px;
  }
}
.poke-search {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row nowrap;
  padding: 12px;

  &__input {
    flex: 1 1 auto;
    margin-right: 8px;
    padding-left: 8px;
    border-radius: 6px;
  }
  &__button {
    flex: 0 0 100px;
    padding: 4px 8px;
    color: white;
    border-radius: 6px;
    border: 2px solid white;
  }
}
</style>
