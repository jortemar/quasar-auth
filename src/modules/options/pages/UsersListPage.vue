<template>
  <q-page class="row justify-center items-center text-center">
    <div class="col-9 col-sm-8 col-md-7 col-lg-6 col-xl-5 q-pa-md q-mt-lg">
      <p class="text-h5 text-weight-bolder">Listado de usuarios</p>
      <div class="row col-6">
        <q-input v-model="searchQuery" type="text" label="Buscar usuario">
          <template v-slot:prepend>
            <q-icon name="las la-search" />
          </template>
        </q-input>
      </div>

      <q-list v-if="searchQuery === ''" bordered class="q-mt-lg">
        <q-item clickable v-ripple v-for="user in currentPageUsers" :key="user.id" @click="handleItemClick(user)">
          <UserComponent :user="user" />
        </q-item>
      </q-list>
      <q-list v-else bordered class="q-mt-lg">
        <q-item clickable v-ripple v-for="user in filteredUsers" :key="user.id" @click="handleItemClick(user)">
          <UserComponent :user="user" />
        </q-item>
      </q-list>
      <PaginationControls :totalPages="totalPages" @update:current="handlePageChange" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onBeforeMount, watch } from 'vue'
import UserComponent from '../components/UserComponent.vue'
import PaginationControls from '../components/PaginationControls.vue'
import useAuth from '../../auth/composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UsersListPage',
  components: { UserComponent, PaginationControls },
  setup() {
    const { callAllUsers, callUsers, currentPageUsers, currentPage, setCurrentPage, totalPages } = useAuth()
    const router = useRouter()
    const page = currentPage.value

    const searchQuery = ref('')

    // filtra por nombre los usuarios de userForAdmin
    const filteredUsers = computed(() => {
      return currentPageUsers.value.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    // Se hace la llamada a la api justo antes de montarse el componente,
    // y cada vez que se actualiza el valor de currentPage en el state
    onBeforeMount(async () => {
      await callUsers(page)    // aquí
    })

    watch(currentPage, async (newValue) => {
      await callUsers(newValue)   // y aquí
    })

    watch(searchQuery, async (newValue) => {
      await callAllUsers()

      if (newValue === '')
        await callUsers(currentPage.value)
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
      setCurrentPage(page)
    }

    return {
      currentPage,
      currentPageUsers,
      filteredUsers,
      handleItemClick,
      handlePageChange,
      searchQuery,
      setCurrentPage,
      totalPages
    }
  }
})
</script>
