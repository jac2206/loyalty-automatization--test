import { test, expect, APIResponse } from '@playwright/test'
import { login, loginWithInvalidUser, loginWithEmptyBody } from '../../../services/users.service'

/**
 * Agrupa todos los tests relacionados con usuarios
 */
test.describe('Auth API - Login', () => {

  /**
   * Caso de prueba:
   * Validar que un usuario válido puede iniciar sesión
   * y que el sistema devuelve un token.
   */
  test('should login successfully and return token', async ({ request }) => {

    let response: APIResponse
    let body

    await test.step('Send login request', async () => {

      response = await login(request)

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(200)

    })

    await test.step('Validate response body', async () => {

      body = await response.json()

      console.log("Response body:", body)

      expect(body).toHaveProperty('token')

    })

  })

  /**
   * Caso de prueba:
   * Validar login con credenciales incorrectas
   */
  test('should fail with invalid credentials', async ({ request }) => {

    let response: APIResponse

    await test.step('Send login request with invalid credentials', async () => {

      response = await loginWithInvalidUser(request)

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(401)

    })

  })

  /**
   * Caso de prueba:
   * Validar login cuando el body está vacío
   */
  test('should fail when request body is empty', async ({ request }) => {

    let response: APIResponse

    await test.step('Send login request with empty body', async () => {

      response = await loginWithEmptyBody(request)

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(401)

    })

  })

})