import { defineStore } from "pinia";
import authApi from "src/api/authApi"
import imgApi from "src/api/imgApi"
import { Cookies } from "quasar";
// import { ref } from "vue";
// import router from "../router";
// import myFetch from ""

export const useAuthStore = defineStore('auth', {
  persist: true,

  state: () => ({
    status: 'authenticating',  // 'authenticated'   'no-authenticated'
    token: null,
    user: null,  // name, email, password, address, phone
    usersList: [],
    userToEdit: null,

    currentPage: 1,
    totalPages: 0
  }),

  getters: {
    currentState: (state) => state.status,
    username: (state) => state.user?.name || '', // si existe coge el name. Si no, un string vacío
    getUser: (state) => state.user,

    getImage(state) {
      if (this.status === 'authenticated') {
        return state.user.photo
      }
    },

    getInitials(state) {
      if (this.status === 'authenticated') {
        return state.user.name.charAt(0) + state.user.surname.charAt(0)
      }
    },

    getUsersList: (state) => state.usersList,
    getUserToEdit: (state) => state.userToEdit,
    getSurname: (state) => state.user.surname,
    getIsAdmin: (state) => state.user.is_admin,
    getCurrentPage: (state) => state.currentPage,
    getTotalPages: (state) => state.totalPages
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

    async deleteImage() {
      // const email = this.user.email
      try {
        const { data } = await authApi.post('deletephoto', { email: this.user.email })
        const { status, message } = data
        console.log(data)

        // this.user = {
        //   ...data.data
        // }

        this.user.photo = null

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
      const { name, surname, email, newEmail, address, phone } = user
      try {
        const { data } = await authApi.put('update', { name, surname, email, newEmail, address, phone })
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
      user.email = this.userToEdit.email
      const { name, surname, email, newEmail, address, phone } = user
      try {
        const { data } = await authApi.put('update', { name, surname, email, newEmail, address, phone })
        const { status, message } = data

        // el objeto data contiene otro data dentro con los valores que buscamos
        // volcamos en el user del state esos campos (name, email, address, phone)
        this.userToEdit = {
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
      this.userToEdit = {
        ...data.data
      }
      console.log(this.userToEdit)
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
