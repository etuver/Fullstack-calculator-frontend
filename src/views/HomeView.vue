<template>
  <div class="home">
  </div>
  <CalculatorComponent v-if="store.getters.isLoggedIn"/>
  <v-container align="center" v-if="!store.getters.isLoggedIn">Vennligst logg inn for å bruke kalkulatoren</v-container>
</template>

<script setup lang="ts">
import CalculatorComponent from '@/components/CalculatorComponent.vue'
import { useStore } from 'vuex' // @ is an alias to /src

const store = useStore()

</script>
