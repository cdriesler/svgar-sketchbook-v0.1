import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Vue2TouchEvents from 'vue2-touch-events';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
 
Vue.use(Vue2TouchEvents, {
  swipeTolerance: 25,
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
