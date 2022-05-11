<template>
  <div class="home">
  </div>
  <CalculatorComponent/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CalculatorComponent from '@/components/CalculatorComponent.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    CalculatorComponent
  }
})
</script>
