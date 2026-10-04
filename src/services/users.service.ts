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

/**
 * Service para userMe
 */
export async function userMe(
  request: APIRequestContext,
  token: string
) {

  return await request.get('/loyalty/v1/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }) 
}

/**
 * Service para Obtener Usuarios
 */
export async function getUsers(
  request: APIRequestContext,
  token: string
) {

  return await request.get('/loyalty/v1/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }) 
}