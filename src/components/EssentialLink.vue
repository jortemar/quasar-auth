<template>
  <!-- <slot name="header-text" /> -->
  <q-item v-if="adminRequirements && isAdmin" clickable tag="a" @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item v-if="!adminRequirements" clickable tag="a" @click="navigateTo">
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
import { defineComponent } from 'vue'
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
    const { getIsAdmin } = useAuth()
    const isAdmin = getIsAdmin

    return {
      getIsAdmin,
      isAdmin,
      navigateTo() {
        if (props.link.startsWith('http')) {
          return window.open(props.link, '_blank')
        }
        router.push({ name: props.link })
      }
    }
  }
})
</script>
