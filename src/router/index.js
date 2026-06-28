import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PlayerDetail from '../views/PlayerDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/player/:name', name: 'PlayerDetail', component: PlayerDetail }
  ]
});
export default router;