<template>
  <div class="poke-detail" v-if="pokemonInfo === null">
    <div class="no-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90"
        fill="#DBE1EC" viewBox="0 0 48 48">
        <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44
        35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16
        16-16 16z"></path>
      </svg>
      <p class="no-content__text">Search for pokemon first</p>
    </div>
  </div>
  <div class="poke-detail" ref="poke-detail" v-else>
    <div class="poke-detail-header">
      <div class="poke-detail-header__info">
        <div class="poke-detail-header__name">{{ pokemonInfo.name | toTitleCase }}</div>
        <div class="poke-detail-header__index">{{ pokemonInfo.id | toPokemonIndex }}</div>
        <div class="poke-detail-header__type-container">
          <div class="type-pill" v-for="(type, index) in pokemonType" :key="index"
            :class="`color-${type}`">
            {{ type | toUpperCase }}
          </div>
        </div>
      </div>
      <div class="poke-detail-header__image" :style="{
          'background-color': pokemonColor,
        }">
        <img :src="pokemonInfo.sprites.front_default" alt="sprite"
          @load="spriteHandler" crossorigin="anonymous">
      </div>
    </div>
    <div class="poke-content">
      <div class="poke-content__item" :class="{ 'poke-content__item--active': activeTab === 1 }">
        <div class="card" style="display:flex;flex-direction:column-reverse;">
          <div v-for="(stat, index) in pokemonInfo.stats" :key="index"
            class="stat-bar">
            <div class="stat-bar__name">
              {{ statMapping[stat.stat.name] }}
            </div>
            <div class="stat-bar__base" :style="{
              'width': `${stat.base_stat/maxStat*60}%`,
            }">
              {{ stat.base_stat }}
            </div>
          </div>
        </div>
      </div>
      <div class="poke-content__item" :class="{ 'poke-content__item--active': activeTab === 2 }">
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
        <span class="card" style="height: 100px; display: block;">height: 100px</span>
      </div>
    </div>
    <div class="poke-footer">
      <div class="footer-item" :class="{ 'footer-item--active': activeTab === 1 }"
        @click="tabHandler(1)">
        <div class="footer-item__content">
          Info
        </div>
      </div>
      <div class="footer-item" :class="{ 'footer-item--active': activeTab === 2 }"
        @click="tabHandler(2)">
        <div class="footer-item__content">
          Moves
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorThief from 'colorthief';

export default {
  name: 'pokeDetail',
  data() {
    return {
      activeTab: 1,
      pokemonType: [],
      statMapping: {
        hp: 'Hp',
        attack: 'Attack',
        defense: 'Defense',
        'special-attack': 'Sp. Attack',
        'special-defense': 'Sp. Defense',
        speed: 'Speed',
      },
      maxStat: 0,
    };
  },
  computed: {
    pokemonInfo() {
      return this.$store.state.pokemon.pokemonInfo;
    },
    pokemonColor() {
      return this.$store.state.pokemon.pokemonColor;
    },
  },
  watch: {
    pokemonInfo() {
      this.pokemonType = this.pokemonInfo.types.map(item => item.type.name);
      this.maxStat = Math.max.apply(null, this.pokemonInfo.stats.map(a => a.base_stat));
    },
  },
  methods: {
    tabHandler(index) {
      this.activeTab = index;
    },
    spriteHandler(element) {
      const img = element.target;
      // img.crossOrigin = "Anonymous";
      const colorThief = new ColorThief();
      const colors = colorThief.getColor(img);
      this.$store.commit('pokemon/set_color', colors);
    },
  },
};
</script>

<style lang="scss" scoped>
.no-content {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  &__text {
    font-size: $base-font-size-large + 6px;
    margin-top: 16px;
  }
}
.poke-detail {
  display: flex;
  flex-flow: column nowrap;
  height: calc(100% - 70px);
  background-color: var(--pokemon-color);
  padding-top: 12px;
}
.poke-detail-header {
  flex: 0 0 60px;
  background-color: var(--pokemon-color-light);
  border-radius: 6px;
  margin: 0px 8px 12px;
  padding: 12px;
  display: flex;
  flex-flow: row nowrap;

  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    height: 100%;
  }
  &__name {
    flex: 0 0 70%;
    padding: 12px;
    font-size: $base-font-size-large;
  }
  &__index {
    flex: 0 0 30%;
    padding: 12px;
    text-align: right;
    font-size: $base-font-size-large;
  }
  &__type-container {
    flex: 1 1 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  &__image {
    flex: 0 0 60px;
    border-radius: 50%;
    background-color: var(--pokemon-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.type-pill {
  flex: 1 1 auto;
  margin: 8px;
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid;
  text-align: center;
  font-size: $base-font-size-small;
}
.poke-content {
  flex: 1 1 auto;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  &__item {
    transition: display linear 0.5s;
    display: none;
    height: 100%;

    &--active {
      display: block;
    }
  }
}
.poke-footer {
  flex: 0 0 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  border-top: 2px solid white;// hehe
}
.footer-item {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: $color-primary;
  transition: background-color linear 0.2s;

  &__content {

  }
  &--active {
    background-color: $color-darker;
  }
}
.card {
  margin: 0px 8px 12px;
  padding: 12px;
  border-radius: 6px;
  // background-color: var(--pokemon-color-light);
  background-color: white;
}
.stat-bar {
  width: 100%;
  margin-bottom: 8px;

  &:first-child{
    margin-bottom: 0px;
  }
  &__name {
    padding: 4px 8px;
    display: inline-block;
    width: 40%;
    background-color: var(--pokemon-color);
    text-align: center;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &__base {
    padding: 4px 8px;
    display: inline-block;
    background-color: var(--pokemon-color-light);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    transition: width linear 0.5s;
  }
}
</style>
