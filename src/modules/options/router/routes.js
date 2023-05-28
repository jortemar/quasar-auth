// import { useAuthStore } from '../../auth/stores/auth-store'
import isAdminGuard from 'src/boot/adminMiddleware'

export default {
  children: [
    {
      path: '',
      name: 'emptyuser',
      redirect: { name: 'settings' }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('src/modules/options/pages/UsersListPage.vue'),
      beforeEnter: isAdminGuard,
      meta: { requiresAdmin: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('src/modules/options/pages/SettingsPage.vue')
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('src/modules/options/pages/PasswordPage.vue')
    },
    {
      path: '/adminediting/:id',  // parámetro dinámico
      name: 'adminediting',
      component: () => import('src/modules/options/pages/AdminEditing.vue'),
      props: true,  // Habilitamos el paso de props como parámetros
      beforeEnter: isAdminGuard,
      meta: { requiresAdmin: true }
    }
  ]
}
