import authRouter from '../modules/auth/router/routes'
import stuffRouter from '../modules/stuff/router/routes'
import optionsRouter from '../modules/options/router/routes'
import isAuthenticatedGuard from 'src/boot/authMiddleware'

// import { useAuthStore } from 'src/modules/auth/stores/auth-store'
// import { Cookies } from 'quasar'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('layouts/MainLayout.vue'),

  //   children: [
  //     { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
  //   ]
  // },
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import('../modules/auth/layouts/LoginLayout.vue'),
    ...authRouter
  },
  {
    path: "/stuff",
    name: "stuff",
    component: () => import('../layouts/MainLayout.vue'),
    ...stuffRouter,
    beforeEnter: isAuthenticatedGuard,
    meta: { requiresAuth: true }
  },
  {
    path: "/options",
    name: "options",
    component: () => import('../layouts/MainLayout.vue'),
    ...optionsRouter,
    beforeEnter: isAuthenticatedGuard,
    meta: { requiresAuth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: "error",
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes


// tratar imagen en back
// editar y eliminar imagen

// permisos
// listado de usuarios solo para admin
// filtro para búsquedas
// paginación

// front - si eres admin o no
// back - si el token es de usuario admin
