// validamos ruta si getIsAdmin es true
import { useAuthStore } from 'src/modules/auth/stores/auth-store'
import { useRoute } from 'vue-router'

const isAdminGuard = async (to, from, next) => {
  const { user } = useAuthStore()
  if (to.meta.requiresAdmin && !user.is_admin) {
    next({ name: 'login' })
  } else {
    next()
  }
}

export default isAdminGuard
