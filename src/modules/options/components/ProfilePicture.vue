<template>
  <div class="q-pa-sm row justify-center">
    <!-- escondemos el input y referenciamos su función al botón -->

    <q-file v-if="!srcImg" v-model="image" outlined @update:model-value="onUpload" label="Sube tu foto"
      label-color="white" class="q-mt-xl brd-photo text-weight-bolder bg-secondary" filled
      style="max-width: 300px; font-weight:bold;">
      <template v-slot:prepend>

        <!-- <p class="q-mt-md q-mr-sm text-center">Sube tu foto</p> -->
        <q-icon name="las la-file-upload" size="lg" color="white" />

      </template>
    </q-file>

    <!-- <q-img v-if="picture && !localImage" :src="picture" :ratio="16 / 9" spinner-color="primary" spinner-size="82px" /> -->
    <div v-if="srcImg" style="width:150px;">
      <q-img class="brd q-mt-sm" :src="srcImg" spinner-color="white" style="height:140px; max-width:150px;" />

      <div class="q-mt-sm">
        <q-btn color="secondary" icon="delete" @click="onDelete" />
      </div>
    </div>

    <!-- <q-img v-if="localImage" :src="localImage" alt="entry-picture" /> -->
    <!-- <q-img v-if="localImage" :src="localImage" alt="entry-picture" :ratio="16 / 9" spinner-color="primary"
      spinner-size="82px" /> -->

    <!-- <q-input @change="onUpload" type="file" v-model="selectedImage" v-show="false"
      accept="image/png, image/jpeg" /> -->

    <!-- <q-btn rounded color="teal" label="Subir foto" @click="onSelectImage">
      <q-icon right style="height:1.3em;" name="las la-file-upload"></q-icon>
    </q-btn> -->

    <!-- <q-uploader :url="getUrl" field-name="photo" dark color="teal" flat bordered style="max-width: 300px" :headers="[
      { name: 'Authorization', value: `Bearer ${token}` }
    ]" /> -->

  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from '../../auth/composables/useAuth'
import { showNotifications } from '../../auth/helpers/notifications'

export default defineComponent({
  name: 'ProfilePicture',

  setup() {
    const { srcImg, updateImage, deleteImage } = useAuth()

    const image = ref(null)

    return {
      // srcImg, image, updateImage, deleteImage,
      srcImg, image,

      onUpload: async () => {
        console.log('onUpload is triggered')
        if (image.value) {
          console.log('hay image')

          const { ok, message } = await updateImage(image.value)

          if (!ok) {
            showNotifications(ok, 'Error', message)
          }
          else {
            showNotifications(ok, 'Éxito', message, 'positive')
          }
        }
      },

      onDelete: async () => {
        const { ok, message } = await deleteImage()

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

<!-- <script setup>
// import {ref} from 'vue'

function getUrl(files) {
  console.log(files)
  // console.log(files.length)
  return 'http://localhost:80/api/upload'
} -->

<!-- </script> -->


<style lang="scss" scoped>
.q-btn {
  color: white;
  width: 1.3 em;
  font-weight: bold;
  font-size: medium;
  border-radius: 10px;
}


.q-form {
  border-radius: 10px;
}

.q-img {
  // width: 200px;
  // position: fixed;
  // bottom: 150px;
  // right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
