import axios from 'axios'
import { EXPRESSION_URL } from '@/service/api/ApiUrls'

export async function postExpression (
  token: string,
  expression: string
) {
  return axios
    .post(EXPRESSION_URL,
      {
        expression: expression
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
    .catch(() => {
      return false
    })
}
