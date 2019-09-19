import Vue from 'vue';
import App from './layouts/App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// plugins
import './plugins/mixins';
import './plugins/filters';
import './plugins/directives';
import './plugins/misc';

// main style
import './assets/scss/main.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
