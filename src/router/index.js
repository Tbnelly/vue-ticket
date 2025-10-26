import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../pages/Landing.vue';
import Signup from '../pages/Signup.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
import Tickets from '../pages/Tickets.vue';

const routes = [
  { path: '/', component: Landing },
  { path: '/auth/signup', component: Signup },
  { path: '/auth/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/tickets', component: Tickets },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
