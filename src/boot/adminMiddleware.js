// validamos ruta si getIsAdmin es true
import { useAuthStore } from 'src/modules/auth/stores/auth-store'
import { useRoute } from 'vue-router'

const isAdminGuard = async (to, from, next) => {
  const { user } = useAuthStore()
  console.log(user)
  if (to.meta.requiresAdmin && !user.is_admin) {
    console.log(getIsAdmin)
    next({ name: 'login' })
  } else {
    next()
  }
}

export default isAdminGuard
