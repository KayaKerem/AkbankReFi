import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './stores/store';
import './assets/styles/app.scss'
import VueApexCharts from 'vue-apexcharts'
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

const router = new VueRouter({
  mode: 'history',
  routes
});



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

