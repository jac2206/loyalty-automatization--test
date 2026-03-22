import { test as base } from '@playwright/test'
import { login } from '../services/users.service'
import { validUser } from '../data/users'

/**
 * Fixture de autenticación
 *
 * Este fixture:
 * 1. Hace login automáticamente
 * 2. Obtiene el token
 * 3. Lo inyecta en los tests
 */

export const test = base.extend<{
  authToken: string
}>({

  authToken: async ({ request }, use) => {

    /**
     * Ejecuta login
     */
    const response = await login(request, validUser)

    const body = await response.json()

    const token = body.token

    console.log("Generated Token:", token)

    /**
     * Pasa el token al test
     */
    await use(token)

  }

})

export const expect = test.expect