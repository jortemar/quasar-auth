<template>
  <q-page class="row justify-center items-center text-center">
    <div class="col-12 col-sm-7 col-md-5 col-lg-4">
      <p class="text-h5 text-weight-bolder text-uppercase">acceso</p>
      <q-form @submit="onSubmit" class="q-pa-xl bg-white">
        <q-input type="email" v-model="userForm.email" label="Correo electrónico" lazy-rules no-error-icon
          :rules="[val => val && val.length > 0 || 'Introduzca su correo electrónico', isValidEmail]">
          <template v-slot:prepend>
            <q-icon name="alternate_email" />
          </template>
        </q-input>

        <q-input v-model="userForm.password" type="password" class="q-mt-md" label="Contraseña" lazy-rules no-error-icon
          :rules="[val => val && val.length > 0 || 'Introduzca su contraseña']">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <div class="q-mt-md">
          <q-btn rounded unelevated label="Log in" type="submit" />
        </div>

        <div class="q-mt-xl">
          <router-link :to="{ name: 'register' }">¿No tienes cuenta?</router-link>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'
import { showNotifications } from '../helpers/notifications'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const router = useRouter()
    const { loginUser, authStatus } = useAuth()

    const userForm = ref({
      email: 'jortemar@gmail.com',
      password: '555555'
    })

    return {
      authStatus,
      userForm,

      onSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value)

        if (!ok) {
          showNotifications(ok, 'Error', message)
        }
        else {
          await router.push({ name: 'settings' })
          showNotifications(ok, 'Éxito', message, 'positive')
        }
      },

      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
        return emailPattern.test(val) || 'El correo no es válido'
      }
    }
  }
})
</script>

<style scoped>
.q-btn {
  background: #FF0080;
  color: white;
  width: 130px;
  font-weight: bold;
  font-size: medium;
}

.q-form {
  border-radius: 15px;
}
</style>
