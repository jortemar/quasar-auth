<template>
  <div class="col-12">
    <q-card>
      <!-- aplicamos class de forma dinámica con una condición -->
      <q-card-section :class="{ 'bg-blue-2': user.is_admin }">
        <div class="row items-center">
          <div v-if="user.photo" class="col-2" style="height:60px; width:60px;">
            <q-img class="brd-nb-1 bg-white" :src="user.photo" spinner-color="white" />
          </div>
          <div v-else class="col-3 brd-nb-1 bg-white" style="height:60px; width:60px;">
            <q-img class="bg-white" src='../../../../pictures/icon.jpg' spinner-color="white" />
          </div>
          <div class="col-9">
            <div class="text-h6">{{ user.name }} {{ user.surname }}</div>
            <div class="text-subtitle">{{ user.email }}</div>
            <div v-if="user.is_admin" class="text-caption text-weight-bolder" style="color:red">Admin</div>
            <div v-else class="text-caption text-weight-bolder" style="color:blue">User</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import useAuth from '../../auth/composables/useAuth'

export default defineComponent({
  name: 'UserComponent',
  props: {
    user: {
      type: Object,
      required: true
    },
    // currentPage: {
    //   type: Number,
    //   required: true
    // }
  }
})
</script>
