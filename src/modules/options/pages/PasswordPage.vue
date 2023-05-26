<template>
  <q-page class="row justify-center items-center text-center">
    <div class="col-11 col-sm-6 col-md-5 col-lg-4 col-xl-3">
      <p class="text-h5 text-weight-bolder">Cambia tu contraseña</p>
      <q-form @submit="onSubmit" class="q-pa-xl bg-white">

        <div class="row justify-center">
          <div class="col-11">
            <q-input v-model="userForm.password" type="password" label="Contraseña" lazy-rules no-error-icon :rules="[
              val => !!val || 'Introduce tu contraseña actual',
              val => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
            ]">
              <template v-slot:prepend>
                <q-icon name="las la-lock" />
              </template>
            </q-input>

            <q-input v-model="userForm.newPassword" type="password" class="q-mt-sm" label="Nueva contraseña" lazy-rules
              no-error-icon :rules="[
                val => !!val || 'Introduce tu nueva contraseña',
                val => val.length >= 6 || 'La nueva contraseña debe tener al menos 6 caracteres',
                val => val !== userForm.password || 'Las contraseñas actual y nueva deben ser diferentes'
              ]">
              <template v-slot:prepend>
                <q-icon name="las la-recycle" />
              </template>
            </q-input>

            <q-input v-model="userForm.newPassword2" type="password" class="q-mt-sm" label="Confirmar nueva contraseña"
              lazy-rules no-error-icon :rules="[
                val => !!val || 'Confirma tu nueva contraseña',
                val => val === userForm.newPassword || 'La nueva contraseña y la confirmación deben ser iguales',
              ]">
              <template v-slot:prepend>
                <q-icon name="las la-user-shield" />
              </template>
            </q-input>
          </div>
        </div>

        <div>
          <div class="q-mt-xl">
            <q-btn rounded unelevated label="Actualizar" type="submit" />
          </div>
          <div class="q-mt-lg">
            <router-link :to="{ name: 'typography' }">Volver</router-link>
          </div>
        </div>

      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from '../../auth/composables/useAuth'
import { showNotifications } from '../../auth/helpers/notifications'

export default defineComponent({
  name: 'PasswordPage',

  setup() {
    const { updatePassword } = useAuth()

    const userForm = ref({
      password: '',
      newPassword: '',
      newPassword2: '',
    })

    return {
      userForm,

      onSubmit: async () => {
        const { ok, message } = await updatePassword(userForm.value)

        if (!ok) {
          showNotifications(ok, 'Error', message)
        }
        else {
          showNotifications(ok, 'Éxito', message, 'positive')
        }
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
