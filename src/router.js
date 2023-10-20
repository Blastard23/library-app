import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import RegisterForm from './components/RegisterForm.vue';
// import HomePage from './components/HomePage.vue';
import Books from './components/BooksPage.vue';
import Admin from './components/AdminPage.vue';
import CRUD from './components/CRUDPage.vue';

const routes = [
  // { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/register', component: RegisterForm },
  { path: '/books', component: Books },
  { path: '/admin', component: Admin },
  { path: '/crud', component: CRUD },
  // {path: '/home', component: HomePage}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;