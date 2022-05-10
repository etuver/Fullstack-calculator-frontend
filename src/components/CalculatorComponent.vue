<template>

  <div class="calculator">
    <div class="display">{{current || '0'}}</div>
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
    <div class="history"  auto-grow ref="history">
      <h5>Log</h5>
      <ul>
        <li v-for="calc in calculations" :key="calc">
          {{calc.calculation}}

        </li>
      </ul>

    </div>
  </div> <!-- the end -->
</template>

<script>

import axios from 'axios'

export default {

  components: {
  },

  data () {
    return {
      current: '',
      operator: null, // is this used anymore?
      prev: null, // is this used anymore?
      operatorClicked: false, // is this used anymore?
      first: null,
      second: null,
      operrrator: null,
      calculations: [],
      fullcalc: null,
      expression: null,

      reviews: [],
      tabs: ['review-form', 'review-list'],
      activeTab: 'review-form'

    }
  },
  methods: {
    clear () {
      this.current = ''
      this.calculations.splice(0)
      this.first = null
      this.operator = null
    },
    append (number) {
      this.current = `${this.current}${number}`
    },
    comma () {
      if (this.current.indexOf('.') === -1) {
        this.append('.')
      }
    },
    inverse () {
      this.current = this.current.charAt(0) === '-'
        ? this.current.slice(1)
        : `-${this.current}`
    },
    del () {
      const lst = this.current.slice(0, -1)
      this.current = lst
    },
    divide () {
      if (this.current === '') {
        return
      }
      this.controlOperrator()
      this.calculcate()
      this.current += '/'
      this.operator = (a, b) => a / b
      this.setPrev()
      this.first = this.current
      this.operrrator = '/'
    },
    multiply () {
      if (this.current === '') {
        return
      }
      this.controlOperrator()
      this.calculcate()
      this.current += '*'
      this.operator = (a, b) => a * b
      this.first = this.current
      this.operrrator = '*'
      this.setPrev()
    },
    plus () {
      if (this.current === '') {
        return
      }
      this.controlOperrator()
      this.calculcate()
      this.current += '+'
      this.operator = (a, b) => a + b
      // this.setPrev();
      this.first = this.current
      this.operrrator = '+'
    },
    minus () {
      if (this.current === '') {
        return
      }
      this.controlOperrator()
      this.calculcate()
      this.current += '-'
      this.operator = (a, b) => a - b
      this.first = this.current
      this.operrrator = '-'
      this.setPrev()
    },
    async result () {
      // let res = "";
      this.fullcalc = this.current
      this.oktransferdata()

      // this.sendApiExp()
      // this.getApiRes()

      // this.fullcalc += "=";
      // if (this.fullcalc.length >10){
      //  this.fullcalc +="\n";
      // }
      // this.fullcalc += this.res;
      // this.calculations.push({calculation: this.fullcalc});
      // this.current = res; //mm
    },
    oktransferdata () {
      this.sendApiExp()
      this.getApiRes()
    },

    sendApiExp () {
      console.log('Post:' + this.fullcalc)
      const expression = this.fullcalc
      axios.post('http://localhost:8080/exp', {
        expression: expression
      })
        .then((response) => {
          console.log('respons her?' + response)
          // this.res = response.result;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getApiRes () {
      let res = ''
      axios.get('http://localhost:8080/result')
        .then(response => {
          // let resp = JSON.stringify(response)
          console.log('res: ' + response.data[0].result)
          res = response.data[0].result

          // let data = resp.data[0];
          // console.log(JSON.parse(data.result))
          // let resp = response.data[0];
          // console.log("yeyeyeyeye"+JSON.parse(resp))
          // res = resp.result;
          this.fullcalc += '='
          if (this.fullcalc.length > 10) {
            this.fullcalc += '\n'
          }
          this.fullcalc += res
          this.calculations.push({ calculation: this.fullcalc })
          this.current = res // mm
        })
    },
    setPrev () {
      this.prev = this.current
      this.operatorClicked = true
    },

    /**
     * dersom siste tegn er en operator, fjern den og erstatt
     * mattestykket kan ikke ha 2 operatorer
     */
    controlOperrator () {
      const lst = this.current.charAt(this.current.length - 1)
      if (lst === '+' || lst === '-' || lst === '/' || lst === '*' || lst === '-') {
        this.current = this.current.substring(0, this.current.length - 1)
      }
    },

    /**
     * Mellomregning dersom det er to operatorer
     */
    calculcate () {
      const math = this.current
      if (math.includes('+') || math.includes('-') || math.includes('*') || math.includes('/')) {
        // const lst = this.current.charAt(this.current.length -1);
        this.result()
        const lastmath = this.calculations.at(this.calculations.length - 1).calculation.toString()
        this.current = lastmath.split('=')[1]
      }
    },

    updateHistory () {

    },

    addReview (review) {
      this.reviews.push(review)
    }

  }
}
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
