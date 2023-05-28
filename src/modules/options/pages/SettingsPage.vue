<template>
  <q-page class="row justify-center items-center text-center q-ma-lg">
    <div class="col-12 col-md-8 col-lg-6">
      <p class="col-12 text-h5 text-weight-bolder">Actualiza tus datos</p>
      <q-form @submit="onSubmit" class="q-pa-xl bg-white ">
        <div class="row justify-between">
          <div class="col-12 col-sm-5">
            <!-- NOMBRE -->
            <q-input v-model="userForm.name" type="text" label=Nombre lazy-rules no-error-icon :rules="[
              val => !!val || 'El nombre es obligatorio'
            ]">
              <template v-slot:prepend>
                <q-icon name="las la-user-tie" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-5">
            <!-- NOMBRE -->
            <q-input v-model="userForm.surname" type="text" label=Apellidos lazy-rules no-error-icon :rules="[
              val => !!val || 'Los apellidos son obligatorios'
            ]">
              <template v-slot:prepend>
                <q-icon name="las la-user-tie" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row justify-between">
          <div class="col-12 col-sm-5 col-md-5">
            <!-- EMAIL -->
            <q-input v-model="userForm.newEmail" type="email" label="email" lazy-rules no-error-icon :rules="[
              val => !!val && isValidEmail(val) || 'El correo electrónico es obligatorio',
            ]">
              <template v-slot:prepend>
                <q-icon name="las la-at" />
              </template>
            </q-input>

            <!-- DIRECCIÓN -->
            <q-input class="q-mt-sm" v-model="userForm.address" type="text" label="Dirección" lazy-rules no-error-icon>
              <template v-slot:prepend>
                <q-icon name="las la-map-marked-alt" />
              </template>
            </q-input>

            <!-- TELÉFONO -->
            <q-input class="q-mt-lg" v-model="userForm.phone" type="text" label="Teléfono" lazy-rules no-error-icon
              :rules="[
                val => !val || isValidPhone(val)
              ]">
              <template v-slot:prepend>
                <q-icon name="las la-phone" />
              </template>
            </q-input>
          </div>

          <div class="q-mt-sm col-12 col-sm-5 col-md-5">
            <!-- UPLOAD FOTO -->
            <ProfilePicture :srcImg="srcImg" :deleteImage="deleteImage" :onUpload="updateImage" />
          </div>
        </div>

        <q-btn class="q-mt-lg" rounded unelevated label="Actualizar" type="submit" />

        <div class="q-mt-lg">
          <router-link :to="{ name: 'typography' }">Volver</router-link>
        </div>

      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ProfilePicture from '../components/ProfilePicture.vue'
import useAuth from '../../auth/composables/useAuth'
import { showNotifications } from '../../auth/helpers/notifications'

export default defineComponent({
  name: 'SettingsPage',
  components: { ProfilePicture },

  setup() {
    const { updateUser, getUser, srcImg, deleteImage, updateImage } = useAuth()
    const user = getUser

    const userForm = ref({
      name: user.value.name,
      surname: user.value.surname,
      newEmail: user.value.email,
      address: user.value.address,
      phone: user.value.phone
    })

    return {
      userForm,
      getUser,
      srcImg,
      deleteImage,
      updateImage,

      onSubmit: async () => {
        const { ok, message } = await updateUser(userForm.value)

        if (!ok) {
          showNotifications(ok, 'Error', message)
        }
        else {
          showNotifications(ok, 'Éxito', message, 'positive')
        }
      },

      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
        return emailPattern.test(val) || 'El correo no es válido'
      },

      isValidPhone(val) {
        // dígitos del 0 al 9, paréntesis, signos + y -, y espacios en blanco
        const phonePattern = /^[0-9()+\- ]+$/
        return phonePattern.test(val) || 'El teléfono no es válido'
      }
    }
  }
})
</script>

<style scoped>
.border {
  border: 1px solid black;
}

.q-btn {
  /* background: teal; */
  background: #ff0080;
  color: white;
  width: 130px;
  font-weight: bold;
  font-size: medium;
  /* border-radius: 10px; */
}

.q-form {
  border-radius: 15px;
}
</style>
