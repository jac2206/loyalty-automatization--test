import { APIResponse } from '@playwright/test'
import { test, expect } from '../../../fixtures/auth.fixture'
import { accumulatePoints, getTransactionsByUser } from '../../../services/transactions.service'
import { testUser } from '../../../data/users'
import { invalidTransactionsAccumulate, negativeAmountAccumulate, notAccountAccumulate, validTransactionsAccumulate } from '../../../data/transactions'

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

  /**
   * Caso de prueba:
   * Realizar acumuacion de puntos para cuenta válida
   * y validar que la transacción se registre correctamente
   */
  test('should accumulate points for a valid account', async ({ request, authToken }) => {
    let response: APIResponse
    let body

    await test.step('Send request to get transactions', async () => {

      response = await accumulatePoints(
        request,
        validTransactionsAccumulate,
        authToken,
      )

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(201)

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos que sea un array
       */
      expect(body).toHaveProperty('pointsEarned')
      expect(body.pointsEarned).toBeGreaterThan(0)
      expect(body.balance).toBeGreaterThanOrEqual(0)
      expect(body.message).toBe('Points accumulated successfully')

    })

  })

    /**
   * Caso de prueba:
   * Realizar acumuacion de puntos para cuenta no existente
   * y validar que la transacción no se registre
   */
  test('should fail to accumulate points for a non-existent account', async ({ request, authToken }) => {
    
    let response: APIResponse
    let body

    await test.step('Send request to get transactions', async () => {

      response = await accumulatePoints(
        request,
        notAccountAccumulate,
        authToken,
      )

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(404)

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos
       */
      expect(body.code).toBe('ACCOUNT_NOT_FOUND')
      expect(body.message).toBe('Account not found')

    })

  })

  /**
   * Caso de prueba:
   * Realizar acumulacion con monto en string y validar que la transacción no se registre
   */
  test('should fail to accumulate points with amount as string', async ({ request, authToken }) => {

    let response: APIResponse
    let body

    await test.step('Send request to get transactions', async () => {

      response = await accumulatePoints(
        request,
        invalidTransactionsAccumulate,
        authToken,
      )

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(422)

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos
       */
      expect(body.code).toBe('VALIDATION_ERROR')
      expect(body.message).toBe('Invalid body')
      expect(Array.isArray(body.errors)).toBeTruthy()

    })

  })

  /**
   * Caso de prueba:
   * Realizar acumulacion con monto negativo y validar que la transacción no se registre
   */
  test('should fail to accumulate points with negative amount', async ({ request, authToken }) => {

    let response: APIResponse
    let body

    await test.step('Send request to get transactions', async () => {

      response = await accumulatePoints(
        request,
        negativeAmountAccumulate,
        authToken,
      )

      console.log("URL:", response.url())
      console.log("STATUS:", response.status())
      console.log("BODY:", await response.text())

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(422)

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos
       */
      expect(body.code).toBe('VALIDATION_ERROR')
      expect(body.message).toBe('Invalid body')
      expect(Array.isArray(body.errors)).toBeTruthy()
      expect(body.errors[0].path).toContain('amount')
      expect(body.errors[0].message).toBe('Too small: expected number to be >0')

    })

  })
})