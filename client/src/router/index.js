import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DetailView from '../views/DetailView.vue'
import MyMovieView from '../views/MyMovieView.vue'
import WatchView from '../views/WatchView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/mymovie',
      name: 'mymovie',
      component: MyMovieView
    },
    {
      path: '/watch',
      name: 'watch',
      component: WatchView
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isLogin = localStorage.access_token
  if (isLogin && (to.name === 'login' || to.name === 'register')) {
    next('/')
  } else if (
    !isLogin &&
    !(to.name === 'login' || to.name === 'home' || to.name === 'detail' || to.name === 'register')
  ) {
    next('/login')
  } else {
    next()
  }
})

export default router
