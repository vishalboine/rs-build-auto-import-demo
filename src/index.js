import Vue from 'vue';
import App from './App.vue';
import './index.css';
import ElementUI, { Button, Dropdown } from 'element-ui';

Vue.use(ElementUI);

Vue.component(Button.name, Button);
Vue.component(Dropdown.name, Dropdown);
new Vue({
  el: '#root',
  render: (h) => h(App),
});
