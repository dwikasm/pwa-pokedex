<template>
  <div id="app">
    <poke-header/>
    <router-view/>
  </div>
</template>

<script>
import PokeHeader from '@/components/PokeHeader.vue';

export default {
  name: 'app',
  components: { PokeHeader },
  computed: {
    pokemonColor() {
      return this.$store.state.pokemon.pokemonColor;
    },
  },
  mounted() {
    this.setTheme([247, 248, 251]);
  },
  watch: {
    pokemonColor() {
      this.setTheme(this.pokemonColor);
    },
  },
  methods: {
    setTheme(color) {
      const [r, g, b] = color;
      const hexCode = `#${[r, g, b].map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      }).join('')}`;

      const bodyStyles = document.body.style;
      bodyStyles.setProperty('--pokemon-color', hexCode);
      bodyStyles.setProperty('--pokemon-color-light', this.LightenDarkenColor(hexCode, 20));
      bodyStyles.setProperty('--pokemon-color-dark', this.LightenDarkenColor(hexCode, -20));
      bodyStyles.setProperty('--pokemon-color-darker', this.LightenDarkenColor(hexCode, -40));
    },
    LightenDarkenColor(col, amt) {
      let usePound = false;

      if (col[0] === '#') {
        col = col.slice(1);
        usePound = true;
      }

      const num = parseInt(col, 16);

      // eslint-disable-next-line no-bitwise
      let r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      // eslint-disable-next-line no-bitwise
      let b = ((num >> 8) & 0x00FF) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      // eslint-disable-next-line no-bitwise
      let g = (num & 0x0000FF) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      // eslint-disable-next-line no-bitwise
      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    },
  },
};
</script>
