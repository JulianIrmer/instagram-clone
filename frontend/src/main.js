import Vue from 'vue';
import App from './App.vue';
import { VLazyImagePlugin } from "v-lazy-image";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './app.scss';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VLazyImagePlugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
