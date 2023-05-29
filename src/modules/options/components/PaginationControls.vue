<template>
  <div class="pagination-controls row justify-center q-mt-sm">
    <q-pagination v-model="current" :min="1" :max="totalPages" :input="true" :size="size" :color="color"
      @update:model-value="onPageInput" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from '../../auth/composables/useAuth'

export default defineComponent({
  name: 'PaginationControls',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: 'lg',
    },
    color: {
      type: String,
      default: 'pink-6',
    },
  },
  emits: ['update:current'],

  // Colocamos el guión bajo porque no nos interesa pasar las props como argumento
  setup(_, { emit }) {
    // const instance = getCurrentInstance()
    const { currentPage } = useAuth()

    // Todo empieza aquí, donde se actualiza el valor de current con el
    // de currentPage en nuestro state. Así, si se actualiza la página
    // empezaremos viendo la misma página en la que estábamos
    const current = ref(currentPage.value)
    console.log(current.value)

    // Recogemos el valor de current del q-pagination y lo emitimos al componente padre
    const onPageInput = () => {
      emit('update:current', current.value)
    }

    return {
      onPageInput,
      current
    }
  }
})
</script>
