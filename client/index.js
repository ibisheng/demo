import Vue from 'vue';
import App from './components/App.vue';
import 'normalize.css';

let rootVM = new Vue({
    el: '#app',
    render: h => h(App)
});