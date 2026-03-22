import { APIResponse } from '@playwright/test'
import { test, expect } from '../../../fixtures/auth.fixture'
import { getTransactionsByUser } from '../../../services/transactions.service'
import { testUser } from '../../../data/users'

/**
 * Agrupa todos los tests relacionados con transacciones
 */
test.describe('Transactions API', () => {

  /**
   * Caso de prueba:
   * Obtener transacciones de un usuario válido
   */
  test('should get transactions for a valid user', async ({ request, authToken }) => {

    let response: APIResponse
    let body

    await test.step('Send request to get transactions', async () => {

      response = await getTransactionsByUser(
        request,
        authToken,
        testUser.documentType,
        testUser.documentNumber
      )

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(200)

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos que sea un array
       */
      expect(body).toHaveProperty('transactions')
      expect(Array.isArray(body.transactions)).toBeTruthy()

    })

  })

    /**
     * Caso de prueba:
     * Validar error cuando documentType es inválido
     */
  test('should fail when documentType is invalid', async ({ request, authToken }) => {

    let response: APIResponse
    let body

    const documentType = "CCCC" // inválido

    await test.step('Send request with invalid documentType', async () => {

        response = await getTransactionsByUser(
        request,
        authToken,
        documentType,
        testUser.documentNumber,
        )

        console.log("URL:", response.url())
        console.log("STATUS:", response.status())
        console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

        expect(response.status()).toBe(422)

    })

    await test.step('Validate error response', async () => {

        body = await response.json()

        console.log("Response body:", body)

        expect(body).toHaveProperty('code', 'VALIDATION_ERROR')
        expect(body).toHaveProperty('message', 'Invalid params')

        expect(Array.isArray(body.errors)).toBeTruthy()

        /**
         * Validamos estructura del error
         */
        expect(body.errors[0]).toHaveProperty('path')
        expect(body.errors[0].path).toContain('documentType')

    })

  })

})