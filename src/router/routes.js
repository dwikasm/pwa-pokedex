import PokeDetail from '../pages/PokeDetail.vue';

export default [
  {
    path: '/',
    redirect: { name: 'pokeDetail' },
  },
  {
    path: '/poke-detail',
    name: 'pokeDetail',
    component: PokeDetail,
  },
];
