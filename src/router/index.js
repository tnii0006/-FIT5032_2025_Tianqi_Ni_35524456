import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import UnauthenticatedView from '../views/UnauthenticatedView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import WeatherView from '../views/WeatherView.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // This route requires authentication
  },
  {
    path: '/unauthenticated',
    name: 'Unauthenticated',
    component: UnauthenticatedView
  },
  
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path:'/FireSignup',
    name: 'FireSignup',
    component: FirebaseRegisterView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/LogoutView.vue')
  },
  {
    path:'/addbook',
    name: 'AddBook',
    component: () => import('../views/AddBookView.vue')
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: () => import('../views/CountBookAPI.vue')
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: () => import('../views/GetAllBookAPI.vue')
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // If the route requires authentication and the user is not authenticated
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to the login page
    next({ name: 'Login' });
  } else {
    // Otherwise, proceed to the route
    next();
  }
});

export default router
