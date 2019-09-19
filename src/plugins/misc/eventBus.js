import Vue from 'vue';

const eventBus = new Vue();
export default {
  install(VueTemp) {
    VueTemp.prototype.$bus = eventBus;
  },
};
