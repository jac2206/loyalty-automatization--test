import { APIRequestContext } from '@playwright/test'

/**
 * Service genérico para login
 */
export async function login(
  request: APIRequestContext,
  data: any
) {

  return await request.post('/loyalty/v1/users/login', {
    data
  })

}