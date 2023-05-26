import { useAuthStore } from '../stores/auth-store'
import { computed } from 'vue'

const useAuth = () => {
  const store = useAuthStore()

  const createUser = async (user) => {
    const resp = await store.createUser(user)
    return resp
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

  const updateImage = async (image) => {
    const resp = await store.updateImage(image)
    return resp
  }

  const deleteImage = async () => {
    const resp = await store.deleteImage()
    return resp
  }

  const callUsers = async (page) => {
    const resp = await store.callUsersList(page)
    return resp
  }

  const callUser = async (id) => {
    await store.callUser(id)
  }

  const setCurrentPage = (page) => {
    store.setCurrentPage(page)
  }

  return {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    updateOtherUser,
    updatePassword,
    updateImage,
    deleteImage,
    callUsers,
    callUser,
    setCurrentPage,

    authStatus: computed(() => store.currentState),
    username: computed(() => store.username),
    getUser: computed(() => store.getUser),
    srcImg: computed(() => store.getImage),
    getInitials: computed(() => store.getInitials),
    // getInitialsOthers: computed(() => store.getInitialsOthers),
    getSurname: computed(() => store.getSurname),
    getIsAdmin: computed(() => store.getIsAdmin),
    currentPageUsers: computed(() => store.getUsersList),
    userToEdit: computed(() => store.getUserToEdit),
    currentPage: computed(() => store.getCurrentPage),
    totalPages: computed(() => store.getTotalPages)
  }
}

export default useAuth
