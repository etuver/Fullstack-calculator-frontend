<template>

  <div class="calculator">
    <div class="display">{{current}}</div>
    <div @click="clear" class="buttonRED">AC</div>
    <div @click="del" class="buttonRED">DEL</div>
    <div @click="inverse" class="button">+/-</div>
    <div @click="divide" class="buttonOperator">/</div>
    <div @click="append('7')" class="button">7</div>
    <div @click="append('8')" class="button">8</div>
    <div @click="append('9')" class="button">9</div>
    <div @click="multiply" class="buttonOperator">*</div>
    <div @click="append('4')" class="button">4</div>
    <div @click="append('5')" class="button">5</div>
    <div @click="append('6')" class="button">6</div>
    <div @click="plus" class="buttonOperator">+</div>
    <div @click="append('1')" class="button">1</div>
    <div @click="append('2')" class="button">2</div>
    <div @click="append('3')" class="button">3</div>
    <div @click="minus" class="buttonOperator">-</div>
    <div @click="append('0')" class="zero">0</div>
    <div @click="comma" class="button">.</div>
    <div @click="result" class="buttonResult">=</div>
      <v-list class="history">
        <v-list-header class="align-center ml-15">Historikk</v-list-header>
        <v-list-item v-for="calc in calculations.reverse()" :key="calc">
          {{calc.expression}}
        </v-list-item>
      </v-list>
  </div> <!-- the end -->
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { getHistory, postExpression } from '@/service/api/Expression'
import { useStore } from 'vuex'

const store = useStore()

const current = ref('')
const calculations = ref(store.state.calculations)

const clear = () => {
  current.value = ''
}

const del = () => {
  const temp = current.value.slice(0, -1)
  current.value = temp
}

const comma = () => {
  if (current.value.indexOf('.') === -1) {
    append('.')
  }
}

const inverse = () => {
  const first = current.value.charAt(0)
  if (first === '-') {
    current.value = current.value.substring(1)
  } else {
    current.value = '-' + current.value
  }
}

const append = (num: string) => {
  current.value += num
}

const plus = () => {
  if (current.value === '') {
    return
  }
  checkOperator()
  if (!checkStringOperator()) {
    return
  }
  current.value += '+'
}

const minus = () => {
  if (current.value === '') {
    return
  }
  checkOperator()
  if (!checkStringOperator()) {
    return
  }
  current.value += '-'
}

const divide = () => {
  if (current.value === '') {
    return
  }
  checkOperator()
  if (!checkStringOperator()) {
    return
  }
  current.value += '/'
}

const multiply = () => {
  if (current.value === '') {
    return
  }
  checkOperator()
  if (!checkStringOperator()) {
    return
  }
  current.value += '*'
}

/**
 * If last item is a operator replace it
 */
const checkOperator = () => {
  const lst = current.value.charAt(current.value.length - 1)
  if (lst === '+' || lst === '-' || lst === '/' || lst === '*' || lst === '-') {
    current.value = current.value.substring(0, current.value.length - 1)
  }
}

const checkStringOperator = () => {
  let math = current.value
  if (math.includes('+') || math.includes('*') || math.includes('/')) {
    return false
  } else if (math.charAt(0) === '-') {
    math = math.substring(1)
    if (math.includes('-')) {
      return false
    }
  }

  return true
}

const result = () => {
  console.log('getres')
  postExpression(
    store.getters.token,
    current.value
  )
    .then((data) => {
      if (data) {
        current.value = data
      } else {
        alert('Something went wrong')
      }
    }).then(updateLog)
}

const updateLog = () => {
  getHistory().then((data) => {
    calculations.value = data
  })
}

onMounted(() => {
  updateLog()
})

</script>

<style scoped>
.calculator {
  border-radius: 250px;
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.display {
  border-radius: 10px 10px 0 0 ;
  border: 1px solid black;
  grid-column: 1 / 5;
  background-color: #42b983;
}

.history{
  border: 1px solid black;
  grid-column: 1/5;
  background-color: cadetblue;
}

.button{
  border: 1px solid black;
}

.buttonOperator {
  border: 1px solid black;
  background-color: orange;
}

.zero {
  border: 1px solid black;
  grid-column: 1 / 3;
  background-color: orange;
}

.buttonResult {
  border: 1px solid black;
  background-color: #42b983;
}

.buttonRED{
  border: 1px solid black;
  background-color: red;
}

.review-container{
  font-size: 15px;
}

.review-form{
  font-size: 15px;
}

</style>
