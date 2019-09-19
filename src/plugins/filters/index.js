import Vue from 'vue';
import toPokemonIndex from './toPokemonIndex';
import toTitleCase from './toTitleCase';
import toUpperCase from './toUpperCase';

Vue.filter('toPokemonIndex', toPokemonIndex);
Vue.filter('toTitleCase', toTitleCase);
Vue.filter('toUpperCase', toUpperCase);
