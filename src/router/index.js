import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { h } from 'vue'


// 动态导入路由组件（路由被访问时才加载对应组件）
const Layout = () => import('@/views/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const TopCategory = () => import('@/views/category/TopCategory.vue')
const SubCategory = () => import('@/views/category/SubCategory.vue')
const Goods = () => import('@/views/goods/index.vue')
const Login = () => import('@/views/login/index.vue')
const Cart = () => import('@/views/cart/index.vue')
const Checkout = () => import('@/views/checkout/index.vue')
const Pay = () => import('@/views/pay/Pay.vue')
const PayResult = () => import('@/views/pay/PayResult.vue')
const Member = () => import('@/views/member/index.vue')
const MemberHome = () => import('@/views/member/components/MemberHome.vue')
const MemberOrderTable = () => import('@/views/member/components/MemberOrderTable.vue')
const MemberOrderDetail = () => import('@/views/member/components/MemberOrderDetail.vue')


// 路由映射
const routes = [
  { path: '/login', component: Login },
  {
    path: '', component: Layout,
    children: [
      { path: '', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/goods/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/checkout', component: Checkout },
      { path: '/pay', component: Pay },
      { path: '/pay/callback', component: PayResult },
      { 
        path: '/member', 
        component: Member,
        children: [
          { path: '', component: MemberHome },
          { path: '/member/order', 
            component: { render: () => h(RouterView) },
            children: [
              { path: '', component: MemberOrderTable },
              { path: ':id', component: MemberOrderDetail }
            ] 
          }
        ]
      }

    ]
  }
]

// 创建路由
const router = createRouter(
  {
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
    scrollBehavior() {
      // 路由跳转时始终滚动到顶部
      return { left: 0, top: 0 }
    }
  }
)
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由：地址是以 /member 开头
  const userStore = useUserStore() 
  if (!userStore.userInfo.token && to.path.match(/^\/(member|checkout|pay)/)) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
