import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// 👇 바로 이 줄이 빠져서 디자인이 안 나왔던 겁니다!
import './assets/main.css'; 

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');