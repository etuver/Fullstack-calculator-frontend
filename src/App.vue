<template>
  <v-app>
    <v-main>
      <v-col class="ma-5" align="center">
      <v-btn to="/" class="mr-5">Home</v-btn>
      <v-btn to="/login" v-if="!store.getters.isLoggedIn"  class="mr-5">Logg inn</v-btn>
      <v-btn to="/register" v-if="!store.getters.isLoggedIn"  class="mr-5">Registrer</v-btn>
      </v-col>
      <v-col align="center" class="ma-5">
      <v-label> {{ store.getters.email }} </v-label>
      </v-col>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts" >

import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const isLoggedin = ref(false)
const store = useStore()
const loggedInEmail = ref('')

const updateLoginState = async () => {
  isLoggedin.value = store.getters.isLoggedIn

  if (isLoggedin.value) {
    loggedInEmail.value = store.getters.email
  } else {
    loggedInEmail.value = ''
  }
}
onMounted(() => {
  updateLoginState()
})

</script>
