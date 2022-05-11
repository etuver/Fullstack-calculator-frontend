<template>
  <v-form @submit.prevent="submit">
    <v-col>
      <v-col class="text-center mt-3" v-if="errormessage">
        <v-alert type="error">{{ errormessage }}</v-alert>
      </v-col>
    </v-col>
    <v-container>
      <v-col>
        <v-text-field
          v-model="email"
          type="text"
          label="Brukernavn (Epost)"
          variant="outlined"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="password"
          variant="outlined"
          label="Passord"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
          @click:append="showPassword = !showPassword"
        >
        </v-text-field>
      </v-col>

      <v-btn
        class="mr-2 text-white"
        color="#004aad"
        rounded
        @click="submit()"
      >
        Logg inn
      </v-btn>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useField } from 'vee-validate'
import { getToken } from '@/service/api/users'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const emit = defineEmits(['updateLoginState'])
const showPassword = ref(false)
const errormessage = ref('')

const { value: email } = useField('email')
const { value: password } = useField('password')

const submit = async () => {
  console.log('values:')
  console.log(email.value)
  console.log(password.value)
  if (email.value && password.value) {
    try {
      const token = await getToken(email.value, password.value)
      console.log('token: ' + token)
      if (!token) {
        throw new Error('No token received')
      }
      store.commit('SET_EMAIL', email.value)
      store.commit('SET_TOKEN', token)
      errormessage.value = ''
      emit('updateLoginState')
      await router.push({ name: 'home' })
    } catch (message) {
      console.error(`Unable to finish log in '${message}'`)
      errormessage.value = 'Feil brukernavn eller passord'
    }
  } else {
    console.log('could not log in')
    errormessage.value = 'Feil brukernavn eller passord'
  }
}

</script>

<style scoped>

</style>
