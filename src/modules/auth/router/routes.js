
export default {
  // name: 'auth',
  // component: () => import('../layouts/LoginLayout.vue'),
  children: [
    {
      path: '',
      name: 'emptylogin',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('src/modules/auth/pages/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('src/modules/auth/pages/RegisterPage.vue')
      // component: () => import('../../../modules/auth/pages/RegisterPage.vue')
    }
  ]

}

