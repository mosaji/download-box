import Tabbar from './pages/Tabbar.vue'
import Dashboard from './pages/Dashboard.vue'
import Downloading from './pages/Downloading.vue'
import Downloaded from './pages/Downloaded.vue'
import Waiting from './pages/Waiting.vue'
import All from './pages/All.vue'
import NotFound from './pages/NotFound.vue'

export default [
  {
    path: '/',
    component: Tabbar,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/all',
    component: All,
  },
  {
    path: '/downloading',
    component: Downloading,
  },
  {
    path: '/downloaded',
    component: Downloaded,
  },
  {
    path: '/waiting',
    component: Waiting,
  },
  {
    path: '*',
    component: NotFound,
  },
]
