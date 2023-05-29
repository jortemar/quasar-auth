<template>
  <div class="q-pa-sm row justify-center">
    <q-file v-if="!srcImg" v-model="image" outlined @update:model-value="onUpload" label="Sube tu foto"
      label-color="white" class="q-mt-xl brd-photo text-weight-bolder bg-secondary" filled
      style="max-width: 300px; font-weight:bold;">
      <template v-slot:prepend>
        <q-icon name="las la-file-upload" size="lg" color="white" />
      </template>
    </q-file>
    <div v-if="srcImg" style="width:150px;">
      <q-img class="brd q-mt-sm" :src="srcImg" spinner-color="white" style="height:140px; max-width:150px;" />
      <div class="q-mt-sm">
        <q-btn color="secondary" icon="delete" @click="deleteImage" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ProfilePicture',
  props: {
    srcImg: {
      type: String,
      required: true
    },
    deleteImage: {
      type: Function,
      required: true
    },
    onUpload: {
      type: Function,
      required: true
    }
  },

  setup() {
    const image = ref(null)
    console.log(image)

    return {
      image
    }
  }
})
</script>

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
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
