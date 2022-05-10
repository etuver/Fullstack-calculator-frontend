<template>
  <div class="home">
    <RegisterComponent/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegisterComponent from '@/components/RegisterComponent.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    RegisterComponent
  }
})
</script>
