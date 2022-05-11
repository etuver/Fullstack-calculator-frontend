import axios from 'axios'
import { EXPRESSION_URL } from '@/service/api/ApiUrls'
import store from '@/store'

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
