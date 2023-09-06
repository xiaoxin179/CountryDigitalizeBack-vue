import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/layout.vue'
import login from '../views/Login.vue'
import { useUserStore } from '../stores/user'
import user from '../views/user.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'user',
          name: 'user',
          component: user
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 获取缓存的数据
  const store = useUserStore()
  const user = store.back_user
  const haveUser = user && user.id 
  console.log(haveUser);
  console.log(user.id);
  const noPermissionPahths = ['/login', '/register']
  if (!haveUser && !noPermissionPahths.includes(to.path)) {//用户没有登录
    next('/login')
  } else {
    next()
  }
})
export default router
