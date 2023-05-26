<template>
  <q-page class="row justify-center items-center text-center">
    <div class="col-12 col-sm-7 col-md-5 col-lg-4">
      <p class="text-h5 text-weight-bolder text-uppercase">registro</p>
      <q-form @submit="onSubmit" class="q-pa-xl bg-white">
        <!-- class="q-gutter-xs col-12 col-md-6" -->
        <q-input type="text" v-model="userForm.name" label="Nombre" lazy-rules no-error-icon
          :rules="[val => val && val.length > 0 || 'Introduzca su nombre']">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input v-model="userForm.email" label="Correo electrónico" type="email" lazy-rules no-error-icon :rules="[val => val && val.length > 0 || 'Introduzca su correo electrónico',
          isValidEmail]">
          <template v-slot:prepend>
            <q-icon name="alternate_email" />
          </template>
        </q-input>

        <q-input type="password" v-model="userForm.password" label="Contraseña" lazy-rules no-error-icon
          :rules="[val => val && val.length > 0 || 'Introduzca su contraseña']">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <div class="q-mt-md">
          <q-btn rounded unelevated label="Crear cuenta" type="submit" />
        </div>

        <div class="q-mt-xl">
          <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
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
  name: 'FormsPage',

  setup() {
    const router = useRouter()
    const { createUser } = useAuth()

    const userForm = ref({
      name: '',
      email: '',
      password: ''
    })

    return {
      userForm,

      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value)

        if (!ok) {
          showNotifications(ok, 'Error', message)
        }
        else {
          await router.push({ name: 'typography' })
          showNotifications(ok, 'Éxito', message, 'purple')
        }
      },

      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'El correo no parece ser válido';
      },
    }
  }
})
</script>

<style scoped>
.q-btn {
  background: #FF0080;
  color: white;
  width: 180px;
  font-weight: bold;
  font-size: medium;
}

.q-form {
  border-radius: 15px;
}
</style>
