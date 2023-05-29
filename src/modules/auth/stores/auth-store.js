import { defineStore } from "pinia"
import authApi from "src/api/authApi"
import imgApi from "src/api/imgApi"
import { Cookies } from "quasar"

export const useAuthStore = defineStore('auth', {
  persist: true,

  // propiedades
  state: () => ({
    currentPage: 1,
    status: 'authenticating',  // 'authenticated'   'no-authenticated'
    token: null,
    totalPages: 0,
    user: null,  // name, email, password, address, phone
    userForAdmin: null,
    usersList: [],
  }),

  // getters
  getters: {
    currentState: (state) => state.status,
    getCurrentPage: (state) => state.currentPage,
    getInitials: (state) => state.user.name.charAt(0).toUpperCase() + state.user.surname.charAt(0).toUpperCase(),
    getTotalPages: (state) => state.totalPages,
    getUser: (state) => state.user,
    getUserForAdmin: (state) => state.userForAdmin,
    getUsersList: (state) => state.usersList
  },

  // acciones (llamadas a endpoint y modificaciones del state)
  actions: {
    // Creación de usuario
    // Llamamos la ruta mandando name, email y password
    // Recogemos el error que viene del back
    async createUser(user) {
      const { name, email, password } = user
      try {
        const { data } = await authApi.post('register', { name, email, password })
        const { status, message } = data
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.errors }
      }
    },

    // Login del usuario
    // Mandamos email y password
    // Recogemos el usuario en nuestro state llamando a loginUser
    async signInUser(user) {
      const { email, password } = user
      try {
        const { data } = await authApi.post('login', { email, password })
        const { status, message, token } = data

        user = {
          ...data.data
        }
        this.loginUser(user, token)
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.errors }
      }
    },

    // Logout del usuario
    // Inicializamos el state y llamamos al endpoint
    // Eliminamos la cookie que almacena el token
    async logout() {
      try {
        this.token = null
        this.status = 'not-authenticated'
        this.user = {}
        this.userForAdmin = {}
        this.currentPage = 1
        const { data } = await authApi.get('logout')
        const { status, message } = data
        Cookies.remove('token')
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    // Actualización de la foto de usuario
    // Mandamos email e imagen
    // Actualizamos state
    async updateImage(photo) {
      try {
        const { data } = await imgApi.post('updatephoto', { email: this.user.email, photo })
        const { status, message } = data
        this.user.photo = data.data.photo
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    // Actualización de cualquier imagen para el administrador
    // Accedemos con el email del usuario a editar
    async updateImageForAdmin(photo) {
      try {
        const { data } = await imgApi.post('updatephoto', { email: this.userForAdmin.email, photo })
        const { status, message } = data
        this.userForAdmin.photo = data.data.photo
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    // Cualquier usuario puede eliminar su propia foto
    async deleteImage() {
      try {
        const { data } = await authApi.post('deletephoto', { email: this.user.email })
        const { status, message } = data
        this.user.photo = null
        return { ok: status, message }
      } catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    // El administrador puede eliminar la foto de cualquier usuario
    async deleteImageForAdmin() {
      try {
        const { data } = await authApi.post('deletephoto', { email: this.userForAdmin.email })
        const { status, message } = data
        console.log(data)
        this.userForAdmin.photo = null
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    // El usuario puede actualizar su contraseña
    async updatePassword(user) {
      user.email = this.user.email
      const { email, password, newPassword } = user
      try {
        const { data } = await authApi.put('updatepassword', { email, password, newPassword })
        const { status, message } = data
        this.user = {
          ...data.data
        }
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    // El usuario puede actualizar cualquiera de sus otros datos
    async updateUser(user) {
      const { name, surname, newEmail, address, phone, is_admin } = user
      try {
        const { data } = await authApi.put('update', { name, surname, email: this.user.email, newEmail, address, phone, is_admin })
        const { status, message } = data
        this.user = {
          ...data.data
        }
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.errors }
      }
    },

    // El administrador puede hacer lo propio con cualquier usuario
    async updateOtherUser(user) {
      user.email = this.userForAdmin.email
      const { name, surname, email, newEmail, address, phone, is_admin } = user
      try {
        const { data } = await authApi.put('update', { name, surname, email, newEmail, address, phone, is_admin })
        const { status, message } = data
        this.userForAdmin = {
          ...data.data
        }
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.errors }
      }
    },

    // Llamamos a los usuarios paginados, con un endpoint dinámico que incluye la variable $page
    async callUsersList(page) {
      const { data } = await authApi.get(`paginatedusers?page=${page}`)
      console.log(data)
      this.usersList = [...data.data]
      this.currentPage = data.current_page
      this.totalPages = data.last_page
    },

    // Llamamos a todos los usuarios. Utilizado para la barra de búsqueda
    async allUsers() {
      const { data } = await authApi.get('users')
      console.log(data)
      this.usersList = [...data]
    },

    // Obtenemos un usuario concreto, localizado con su id
    async callUser(id) {
      const { data } = await authApi.get(`user/${id}`)
      console.log(data.data)
      this.userForAdmin = {
        ...data.data
      }
      console.log(this.userForAdmin)
    },

    // Almacenamos el token en las cookies y actualizamos el state
    loginUser(user, token) {
      if (token) {
        Cookies.set('token', token)
        this.token = token
      }
      this.user = user
      this.status = 'authenticated'
    },

    // Un set para actualizar el currentPage de nuestro state
    setCurrentPage(page) {
      this.currentPage = page
    }
  }
})


// dossier - análisis funcional atípico
// diseño poca importancia - importante que funcione
// similar a una app

/*

front quasar back laravel
semilleros , venden semillas
quieren un wallapop para semillas, para trapichear con semillas

solo para profesionales semilleros
pones oferta y demanda, y pones chat para hablar

tramitar compra fuera de la app

20 tantos semilleros

app: consentio

home menú abierto
menú lateral
primer apartado: mi cuenta - datos cliente

*/
