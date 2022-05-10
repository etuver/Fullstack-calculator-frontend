<template>
  <v-app>
    <v-main>
      <router-view/>
      <CalculatorComponent/>
    </v-main>
  </v-app>
</template>

<script>

import CalculatorComponent from '@/components/CalculatorComponent'
export default {
  name: 'App',
  components: { CalculatorComponent },
  data: () => ({
    //
  })
}
</script>
