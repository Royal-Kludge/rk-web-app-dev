//import './assets/main.css'
import "@/assets/css/style.scss";
import 'vue-cropper/dist/index.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import element from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import i18n from "../src/lang";
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);
app.use(element).use(i18n);

app.mount("#app");
