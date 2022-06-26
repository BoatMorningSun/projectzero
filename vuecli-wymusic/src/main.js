import Vue from 'vue'
import App from './App.vue'
import "@/style/reset.css"
import "@/mobile/flexible"
import router from "@/router"
Vue.config.productionTip = false
import { Tabbar, TabbarItem ,NavBar,Col, Row , Image as VanImage , Cell, CellGroup,Icon , Search ,Tag ,Toast, List} from 'vant';
Vue.use(List);
Vue.use(Tag);
Vue.use(Search); 
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row); 
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

 