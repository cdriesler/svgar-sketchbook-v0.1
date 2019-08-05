import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Vue2TouchEvents from 'vue2-touch-events';
 
Vue.use(Vue2TouchEvents, {
  swipeTolerance: 25,
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
