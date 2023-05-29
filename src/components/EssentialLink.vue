<template>
  <q-item v-if="adminRequirements && isAdmin" clickable :active="active"
    active-class="bg-yellow-2 text-primary text-weight-bold" tag="a" @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item v-if="!adminRequirements" clickable :active="active" active-class="bg-yellow-2 text-primary text-weight-bold"
    tag="a" @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router';
import useAuth from 'src/modules/auth/composables/useAuth'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    adminRequirements: {
      type: Boolean
    },

  },
  setup(props) {
    const router = useRouter()
    const { user } = useAuth()
    const isAdmin = user.value.is_admin

    const active = computed(() => {
      return router.currentRoute.value.name === props.link
    })

    return {
      active,
      isAdmin,
      user,

      navigateTo() {
        if (props.link.startsWith('http')) {
          console.log(active)
          active.value = true
          return window.open(props.link, '_blank')
        }
        router.push({ name: props.link })
      }
    }
  }
})
</script>
