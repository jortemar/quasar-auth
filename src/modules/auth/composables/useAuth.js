import { useAuthStore } from '../stores/auth-store'
import { computed } from 'vue'
import { showNotifications } from '../../auth/helpers/notifications'

const useAuth = () => {
  const store = useAuthStore()

  const callUser = async (id) => {
    await store.callUser(id)
  }

  const callUsers = async (page) => {
    const resp = await store.callUsersList(page)
    return resp
  }

  const createUser = async (user) => {
    const resp = await store.createUser(user)
    return resp
  }

  const deleteImage = async () => {
    const { ok, message } = await store.deleteImage()

    if (!ok) {
      showNotifications(ok, 'Error', message)
    }
    else {
      showNotifications(ok, 'Éxito', message, 'positive')
    }
  }

  const deleteImageForAdmin = async () => {
    const { ok, message } = await store.deleteImageForAdmin()

    if (!ok) {
      showNotifications(ok, 'Error', message)
    }
    else {
      showNotifications(ok, 'Éxito', message, 'positive')
    }
  }

  const loginUser = async (user) => {
    const resp = await store.signInUser(user)
    return resp
  }

  const logoutUser = async () => {
    const resp = await store.logout()
    store.setCurrentPage(1)   // aprovechamos el logout para inicializar currentPage de nuestro state
    return resp
    // se puede incluir en el logout un window.location. Al hacerse el refresh del navegador web se purga el estado
    // store.commit('journal/clearEntries')
  }

  const setCurrentPage = (page) => {
    store.setCurrentPage(page)
  }

  const updateImage = async (image) => {
    const resp = await store.updateImage(image)
    return resp
  }

  const updateImageForAdmin = async (image) => {
    const resp = await store.updateImageForAdmin(image)
    return resp
  }

  const updateUser = async (user) => {
    const resp = await store.updateUser(user)
    return resp
  }

  const updateOtherUser = async (user) => {
    const resp = await store.updateOtherUser(user)
    return resp
  }

  const updatePassword = async (user) => {
    const resp = await store.updatePassword(user)
    return resp
  }

  return {
    callUser,
    callUsers,
    createUser,
    deleteImage,
    deleteImageForAdmin,
    loginUser,
    logoutUser,
    setCurrentPage,
    updateImage,
    updateImageForAdmin,
    updateOtherUser,
    updatePassword,
    updateUser,

    authStatus: computed(() => store.currentState),
    currentPage: computed(() => store.getCurrentPage),
    currentPageUsers: computed(() => store.getUsersList),
    getInitials: computed(() => store.getInitials),
    totalPages: computed(() => store.getTotalPages),
    user: computed(() => store.getUser),
    userForAdmin: computed(() => store.getUserForAdmin),
  }
}

export default useAuth
