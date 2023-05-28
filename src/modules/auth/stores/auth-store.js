import { defineStore } from "pinia"
import authApi from "src/api/authApi"
import imgApi from "src/api/imgApi"
import { Cookies } from "quasar"

export const useAuthStore = defineStore('auth', {
  persist: true,

  state: () => ({
    currentPage: 1,
    status: 'authenticating',  // 'authenticated'   'no-authenticated'
    token: null,
    totalPages: 0,
    user: null,  // name, email, password, address, phone
    userForAdmin: null,
    usersList: [],
  }),

  getters: {
    currentState: (state) => state.status,
    getCurrentPage: (state) => state.currentPage,
    getInitials: (state) => state.user.name.charAt(0) + state.user.surname.charAt(0),
    getTotalPages: (state) => state.totalPages,
    getUser: (state) => state.user,
    getUserForAdmin: (state) => state.userForAdmin,
    getUsersList: (state) => state.usersList
  },

  actions: {
    async createUser(user) {
      const { name, email, password } = user
      try {
        const { data } = await authApi.post('register', { name, email, password })
        const { status, message } = data
        delete user.password
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.errors }
      }
    },

    async signInUser(user) {
      const { email, password } = user
      try {
        const { data } = await authApi.post('login', { email, password })
        const { status, message, token } = data

        user = {
          ...data.data
        }
        console.log(user)
        this.loginUser(user, token)
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.errors }
      }
    },

    async logout() {
      try {
        const { data } = await authApi.get('logout')
        const { status, message } = data
        // si inicializamos el user en null, todos los getters que
        // llamen propiedades null darán error tras el logout
        this.user = {}
        this.token = null
        this.status = 'not-authenticated'
        this.userForAdmin = {}
        Cookies.remove('token')
        return { ok: status, message }
      }
      catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    async updateImage(photo) {
      const email = this.user.email
      console.log('entra')
      console.log(photo)
      try {
        const { data } = await imgApi.post('updatephoto', { email, photo })
        const { status, message } = data
        console.log(data)

        // this.user = {
        //   ...data.data
        // }

        this.user.photo = data.data.photo

        return { ok: status, message }

      } catch (error) {
        return { ok: false, message: error.response.data.message }
      }
    },

    async updateImageForAdmin(photo) {
      const email = this.userForAdmin.email
      console.log('entra')
      console.log(photo)
      try {
        const { data } = await imgApi.post('updatephoto', { email, photo })
        const { status, message } = data
        console.log(data)

        // this.user = {
        //   ...data.data
        // }

        this.userForAdmin.photo = data.data.photo

        return { ok: status, message }

      } catch (error) {
        return { ok: false, message: error.response.data.message }
      }
    },

    async deleteImage() {
      // const email = this.user.email
      try {
        const { data } = await authApi.post('deletephoto', { email: this.user.email })
        const { status, message } = data
        console.log(data)
        this.user.photo = null
        // this.userToEdit.photo = null

        return { ok: status, message }

      } catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    async deleteImageForAdmin() {
      try {
        const { data } = await authApi.post('deletephoto', { email: this.userForAdmin.email })
        const { status, message } = data
        console.log(data)
        this.userForAdmin.photo = null
        // this.userToEdit.photo = null

        return { ok: status, message }

      } catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    async deleteImageForAdmin() {
      try {
        const { data } = await authApi.post('deletephoto', { email: this.userForAdmin.email })
        const { status, message } = data
        console.log(data)
        this.userForAdmin.photo = null

        return { ok: status, message }

      } catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

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
      } catch (error) {
        console.log(error)
        return { ok: false, message: error.response.data.message }
      }
    },

    async updateUser(user) {
      user.email = this.user.email
      const { name, surname, email, newEmail, address, phone, is_admin } = user
      console.log(is_admin)
      try {
        const { data } = await authApi.put('update', { name, surname, email, newEmail, address, phone, is_admin })
        const { status, message } = data

        // el objeto data contiene otro data dentro con los valores que buscamos
        // volcamos en el user del state esos campos (name, email, address, phone)
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

    async updateOtherUser(user) {
      user.email = this.userForAdmin.email
      const { name, surname, email, newEmail, address, phone, is_admin } = user
      try {
        const { data } = await authApi.put('update', { name, surname, email, newEmail, address, phone, is_admin })
        const { status, message } = data

        // el objeto data contiene otro data dentro con los valores que buscamos
        // volcamos en el user del state esos campos (name, email, address, phone)
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

    // async callUsersList() {
    //   const { data } = await authApi.get('users', { email: this.user.email })
    //   this.usersList = [...data]
    // },

    async callUsersList(page) {
      console.log(page)
      const { data } = await authApi.get(`users?page=${page}`)
      console.log(data)
      this.usersList = [...data.data]
      console.log(this.usersList)
      this.currentPage = data.current_page
      console.log(this.currentPage)
      this.totalPages = data.last_page
      console.log(this.totalPages)

      // no almacenar en el state. devolver directamente al componente

      // en el store solo almacenamos la información que usamos en muchos sitios
      // nombre usuario, token ...
    },


    async callUser(id) {
      const { data } = await authApi.get(`user/${id}`)

      console.log(data.data)
      this.userForAdmin = {
        ...data.data
      }
      console.log(this.userForAdmin)
      // return this.userToEdit


      // try {
      //   const { data } = await authApi.get(`user/${id}`)
      //   const { status, message } = data

      //   console.log(data)

      //   this.userToEdit = {
      //     ...data.data
      //   }

      //   console.log(this.userToEdit)

      //   return { ok: status, message }

      // } catch (error) {
      //   return { ok: false, message: error.response.data.errors }
      // }
    },

    // setAdminOtherUser() {
    //   this.userToEdit.is_admin = !this.userToEdit.is_admin
    // },

    loginUser(user, token) {
      if (token) {
        Cookies.set('token', token)
        this.token = token
      }
      this.user = user
      this.status = 'authenticated'
    },

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
