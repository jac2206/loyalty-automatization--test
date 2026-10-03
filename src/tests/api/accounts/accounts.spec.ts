import { APIResponse } from '@playwright/test'
import { test, expect } from '../../../fixtures/auth.fixture'
import { getBalanceByUser } from '../../../services/accounts.service'
import { testUser } from '../../../data/users'

/**
 * Agrupa todos los tests relacionados con cuentas
 */
test.describe('Accounts API', () => {

  /**
   * Caso de prueba:
   * Obtener saldo de un usuario válido
   */
  test('should get balance for a valid user', async ({ request, authToken }) => {

    let response: APIResponse
    let body

    await test.step('Send request to get balance', async () => {

      response = await getBalanceByUser(
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
       * Validamos que sea un balance
       */
      expect(body).toHaveProperty('balance')
      expect(body.balance).toBeGreaterThan(0)
      expect(body.documentType).toBe(testUser.documentType)
      expect(body.documentNumber).toBe(testUser.documentNumber)

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

        response = await getBalanceByUser(
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

        /**
         * Validamos estructura del error
         */
        expect(body.errors[0]).toHaveProperty('path')
        expect(body.errors[0].path).toContain('documentType')

    })

  })

      /**
     * Caso de prueba:
     * Validar error cuando documentNumber es no exdistente
     */
  test('should fail when documentNumber is not found', async ({ request, authToken }) => {

    let response: APIResponse
    let body

    const documentNumber = "1234" // inválido

    await test.step('Send request with not found documentNumber', async () => {

        response = await getBalanceByUser(
        request,
        authToken,
        testUser.documentType,
        documentNumber,
        )

        console.log("URL:", response.url())
        console.log("STATUS:", response.status())
        console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

        expect(response.status()).toBe(404)

    })

    await test.step('Validate error response', async () => {

        body = await response.json()

        console.log("Response body:", body)

        expect(body).toHaveProperty('code', 'ACCOUNT_NOT_FOUND')
        expect(body).toHaveProperty('message', 'Account not found')
    })

  })

})