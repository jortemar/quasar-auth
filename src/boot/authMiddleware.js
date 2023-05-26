import { Cookies } from "quasar"

const isAuthenticatedGuard = async (to, from, next) => {
  if (to.meta.requiresAuth && !Cookies.get('token')) {
    next({ name: 'login' })
  } else {
    next()
  }
}

export default isAuthenticatedGuard
