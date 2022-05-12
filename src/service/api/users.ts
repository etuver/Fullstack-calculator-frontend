import axios from 'axios'
import { AUTH_URL, USER_URL } from '@/service/api/ApiUrls'
import store from '@/store'

export async function getToken (
  email: string,
  password: string
): Promise<string> {
  return axios
    .post(AUTH_URL, {
      email: email,
      password: password
    })
    .then((response) => {
      if (!response.data.token) {
        throw new Error('Token from endpoint was empty.')
      }
      return response.data.token
    })
    .catch((error) => {
      console.error(`Unable to retrieve token: ${error}`)
      return ''
    })
}

export async function postUser (
  email: string,
  password: string
) {
  return axios
    .post(USER_URL, {
      email: email,
      password: password
    })
    .then(() => {
      return true
    })
    .catch((error) => {
      console.error(`Unable to post user: ${error}`)
      return false
    })
}

export async function getUser (token: string) {
  return axios
    .get(USER_URL, {
      headers: {
        Authentication: `Bearer ${store.state.token}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(`Unable to retrieve user: ${error}`)
      return {}
    })
}

export async function putUser (
  token: string,
  email: string,
  password: string
) {
  return axios
    .put(
      USER_URL,
      {
        email: email,
        password: password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {
      return true
    })
    .catch((error) => {
      console.error(`Unable to put user: ${error}`)
      throw error
    })
}
