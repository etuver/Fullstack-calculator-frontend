<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col class="d-flex flex-row mt-5 .rounded-xl">
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Epost"
            placeholder="ola.nodrmann@gmail.ru"
            variant="outlined"
            v-model="email"
            :error-messages="errors.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Passord"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            variant="outlined"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="password"
            :error-messages="errors.password"
          ></v-text-field>
          <v-text-field
            label="Gjenta Passord"
            variant="outlined"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            v-model="confirmPassword"
            :error-messages="errors.confirmPassword"
          ></v-text-field>
        </v-col>
        <v-col class="justify-center d-flex" cols="12">
          <v-btn
            color="#004aad"
            class="text-white"
            type="submit"
          >Registrer</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useForm, useField } from 'vee-validate'
import { object, string, ref } from 'yup'
import { postUser } from '@/service/api/users'
import { useRouter } from 'vue-router'

export default defineComponent({
  data: () => ({
    show1: false,
    show2: false
  }),
  setup () {
    const router = useRouter()

    const validationSchema = object({
      email: string().required().email('Fyll inn en gyldig mailadresse'),
      password: string().required('Dette feltet er påkrevd'),
      confirmPassword: string()
        .required('Dette feltet er påkrevd')
        .oneOf([ref('password'), null], 'Passordene må matche')
    })

    const { handleSubmit, errors } = useForm({
      validationSchema
    })

    const { value: email } = useField('email')
    const { value: password } = useField('password')
    const { value: confirmPassword } = useField('confirmPassword')

    const submit = handleSubmit((values) => {
      if (
        values.email &&
        values.password
      ) {
        postUser(
          values.email,
          values.password
        )
        router.push({ name: 'login' })
      }
    })

    return {
      email,
      password,
      confirmPassword,
      errors,
      submit
    }
  }
})
</script>

<style scoped>

</style>
