import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './stores/store';
import './assets/styles/app.scss'
import App from './App.vue';

Vue.use(VueRouter);


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