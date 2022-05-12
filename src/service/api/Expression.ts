import axios from 'axios'
import { API_URL, EXPRESSION_URL, USER_URL } from '@/service/api/ApiUrls'
import store from '@/store'

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function postExpression (
  token: string,
  expression: string
) {
  return axios
    .post(EXPRESSION_URL,
      {
        expression: expression,
        expressionUserEmail: store.state.email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch(() => {
      return false
    })
}

export async function getHistory () {
  try {
    const token = store.state.token
    const email = store.state.email
    console.log(token)
    const response = await apiClient.get('/exp/exp' + email, {
      headers: {
        Authentication: 'Bearer ' + token
      }
    })
    console.log('respons:' + JSON.stringify(response.data))
    return response.data
  } catch {
    return false
  }
}
