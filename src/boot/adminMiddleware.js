// validamos ruta si getIsAdmin es true
import { useAuthStore } from 'src/modules/auth/stores/auth-store'

const isAdminGuard = async (to, from, next) => {
  const { getIsAdmin } = useAuthStore()
  if (to.meta.requiresAdmin && !getIsAdmin) {
    console.log(getIsAdmin)
    next({ name: 'login' })
  } else {
    next()
  }
}

export default isAdminGuard
