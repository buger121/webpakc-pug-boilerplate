// Vue.js
import Vue from 'vue';
import i18n from '@/js/module/i18n.js';

// Vue components (for use in html)
// Vue.component('example-component', require('./components/Example.vue').default);

// Vue init
const app = new Vue({
  el: '#app',
  i18n,
  data() {
    return {};
  },
});
