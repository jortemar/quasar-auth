<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-success">
      <q-toolbar>
        <q-btn flat dense round icon="las la-bars" size="xl" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title v-if="!user.photo && !user.surname" class="text-h4">
          Quasar App
        </q-toolbar-title>

        <q-toolbar-title v-if="user.photo">
          <q-img class="brd-nb bg-white" :src="user.photo" spinner-color="white" style="height:60px; width:60px;" />
        </q-toolbar-title>

        <q-toolbar-title v-if="!user.photo && user.surname" class="text-h4 text-center">
          <div class="brd-white bg-secondary" style="height:60px; width:60px;">
            <p class="q-mt-sm">{{ getInitials }}</p>
          </div>
        </q-toolbar-title>

        <div class="text-h6" v-if="user.name">
          Hola, {{ user.name }}
          <q-btn class="brd-white q-ml-lg" size="md" color="warning" unelevated icon="logout" @click="onLogout" />
        </div>
        <div v-else>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-subtitle2 text-grey-8">
          Menú
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />

      </q-list>
    </q-drawer>

    <q-page-container class="bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { linksList } from '../router/link-list'
import EssentialLink from 'components/EssentialLink.vue'
import useAuth from '../modules/auth/composables/useAuth'
import { showNotifications } from '../modules/auth/helpers/notifications'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    const { authStatus, getInitials, logoutUser, user } = useAuth()

    return {
      authStatus,
      getInitials,
      leftDrawerOpen,
      linksList,
      user,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      onLogout: async () => {
        const { ok, message } = await logoutUser()

        if (!ok) {
          showNotifications(ok, 'Error', message)
        }
        else {
          await router.push({ name: 'login' })
          showNotifications(ok, 'Éxito', message, 'negative')
        }
      }
    }
  }
})
</script>

<style scoped>
.bg {
  background-image: url("/src/assets/leone-venter-VieM9BdZKFo-unsplash.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.q-toolbar {
  height: 70px;
}

.brd-white {
  border: 1px solid white;
}
</style>
