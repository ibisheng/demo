import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'normalize.css';
import App from './components/App.vue';

Vue.use(VueRouter);
Vue.use(iView);

let rootVM = new Vue({
    el: '#app',
    render: h => h(App)
});