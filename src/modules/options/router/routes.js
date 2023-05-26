// import { useAuthStore } from '../../auth/stores/auth-store'

export default {
  children: [
    {
      path: '',
      name: 'emptyuser',
      redirect: { name: 'settings' }
    },
    // {
    //   path: '/users',
    //   name: 'users',
    //   component: () => import('src/modules/options/pages/UsersListPage.vue')
    // },
    {
      path: '/users',
      name: 'users',
      component: () => import('src/modules/options/pages/UsersListPage.vue'),
      // beforeRouteEnter: (to, from, next) => {
      //   const page = to.query.page || 1  // Obtenemos el número de página desde los parámetros de la URL
      //   const store = useAuthStore()
      //   store.callUsersList(page)
      //     .then(() => next())
      //     .catch(() => next({ to: 'error' }))
      // }
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
    }
  ]
}
