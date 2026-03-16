import { APIRequestContext } from '@playwright/test'
import { validUser, invalidUser } from '../data/users'

/**
 * Login con usuario válido
 */
export async function login(request: APIRequestContext) {

  return await request.post('/loyalty/v1/users/login', {
    data: validUser
  })

}

/**
 * Login con usuario inválido
 */
export async function loginWithInvalidUser(request: APIRequestContext) {

  return await request.post('/loyalty/v1/users/login', {
    data: invalidUser
  })

}

/**
 * Login con body vacío
 * Sirve para validar errores de validación en la API
 */
export async function loginWithEmptyBody(request: APIRequestContext) {

  return await request.post('/loyalty/v1/users/login', {
    data: {}
  })

}