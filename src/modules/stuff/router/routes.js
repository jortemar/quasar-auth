// import { useAuthStore } from '../../auth/stores/auth-store'
// import { Cookies } from "quasar";
// import authRoutes from '../../auth/router/routes'

export default {

  children: [
    {
      path: '',
      name: 'emptytypography',
      redirect: { name: 'typography' }
    },
    {
      path: '/typography',
      name: 'typography',
      component: () => import('src/modules/stuff/pages/TypographyPage.vue'),
    },
    {
      path: '/flex',
      name: 'flex',
      component: () => import('src/modules/stuff/pages/FlexPage.vue'),
    },
    {
      path: '/dialogs',
      name: 'dialogs',
      component: () => import('src/modules/stuff/pages/DialogsPage.vue'),
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('src/modules/stuff/pages/FormsPage.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('src/modules/auth/pages/UserPage.vue')
    }
  ],


  // beforeEach: (to, from) => {
  //   // const store = useAuthStore()
  //   if (to.meta.requiresAuth && !Cookies.get('token')) {
  //     return { name: 'login' }
  //   }
  // }

  // al definir la ruta le coloco un meta, ahí puedo definir el middleware (a las que quiero acceder de forma protegida)

  /*
  MI CUENTA. (formulario para consultar y editar datos usuario)  añadir tfno y direccion. Guardar y actualizar base datdos

  CAMBIO CONTRASEÑA.

  SUBIR UN AVATAR PARA EL USUARIO. si no hay foto circuilito con iniciales

  la foto va a la carpeta storage/public de laravel (en base de datos solo url, no imagen)

  */
}
