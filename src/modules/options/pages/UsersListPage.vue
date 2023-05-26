<template>
  <q-page class="row justify-center items-center text-center">
    <div class="col-9 col-sm-8 col-md-7 col-lg-6 col-xl-5 q-pa-md q-mt-lg">
      <p class="text-h5 text-weight-bolder">Listado de usuarios</p>
      <q-list bordered class="q-mt-lg">
        <q-item clickable v-ripple v-for="user in currentPageUsers" :key="user.id" @click="handleItemClick(user)">
          <UserComponent :user="user" />
        </q-item>
      </q-list>
      <PaginationControls :totalPages="totalPages" @update:current="handlePageChange" />
      <!-- <PaginationControls :currentPage="currentPage" :totalPages="totalPages" @update:model-value="handlePageChange" /> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onBeforeMount, watch } from 'vue'
import UserComponent from '../components/UserComponent.vue'
import PaginationControls from '../components/PaginationControls.vue'
import useAuth from '../../auth/composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UsersListPage',
  components: { UserComponent, PaginationControls },
  setup() {
    const { callUsers, currentPageUsers, currentPage, setCurrentPage, totalPages } = useAuth()
    const router = useRouter()

    const page = currentPage.value

    // Se hace la llamda a la api justo antes de montarse el componente,
    // y cada vez que se actualiza el valor de currentPage en el state
    onBeforeMount(async () => {
      console.log(page)
      await callUsers(page)    // aquí
    })

    watch(currentPage, async (newValue) => {
      await callUsers(newValue)   // y aquí
    })

    // aquí hacemos la petición para ver un usuario determinado
    // nos manda a la página 'adminediting' y el id pasa como parámetro en la URL
    const handleItemClick = (user) => {
      router.push({
        name: 'adminediting',
        params: {
          id: user.id
        }
      })
    }

    // seteamos el currentPage del state con el valor actual de la página
    const handlePageChange = (page) => {
      console.log(page)
      setCurrentPage(page)
    }

    return {
      currentPage,
      currentPageUsers,
      handleItemClick,
      handlePageChange,
      setCurrentPage,
      totalPages
    }
  }
})
</script>
