import { APIResponse } from '@playwright/test'
import { test, expect } from '../../../fixtures/auth.fixture'
import { getTransactionsByUser } from '../../../services/transactions.service'
import { testUser } from '../../../data/users'
import { getUsers, userMe } from '../../../services/users.service'

/**
 * Agrupa todos los tests relacionados con usuarios
 */
test.describe('Users API', () => {

  /**
   * Caso de prueba:
   * Obtener información de un usuario válido
   */
  test('should get user information for a valid user', async ({ request, authToken }) => {

    let response: APIResponse;
    let body;

    await test.step('Send request to get user information', async () => {

      response = await userMe(
        request,
        authToken
      );

      console.log("URL:", response.url());
      console.log("STATUS:", response.status());
      console.log("BODY:", await response.text());

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(200);

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos
       */
      expect(body.documentType).toBe('CC');
      expect(body.documentNumber).toBe('1037630472');
      expect(body.fullName).toBe('Julian Arango Correa');
      expect(body.email).toBe('arango773@gmail.com');
      expect(body.phone).toBe('3117468187');
    })
  })

   /**
   * Caso de prueba:
   * Token invalido al obtener información de un usuario
   */

  test('should fail when token is not provided', async ({ request }) => {

    let response: APIResponse;
    let body;

    await test.step('Send request to get user information', async () => {

      response = await userMe(
        request,
        '123123'
      );

      console.log("URL:", response.url());
      console.log("STATUS:", response.status());
      console.log("BODY:", await response.text());

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(401);

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos
       */
      expect(body.code).toBe('INVALID_TOKEN');
      expect(body.message).toBe('Token invalid or expired');
    })
  })
  
   /**
   * Caso de prueba:
   * Obtener todos los usuarios
   */
  test('should get all users', async ({ request, authToken }) => {

    let response: APIResponse;
    let body;

    await test.step('Send request to get user information', async () => {

      response = await getUsers(
        request,
        authToken
      );

      console.log("URL:", response.url());
      console.log("STATUS:", response.status());
      console.log("BODY:", await response.text());

    })

    await test.step('Validate HTTP status code', async () => {

      expect(response.status()).toBe(200);

    })

    await test.step('Validate response structure', async () => {

      body = await response.json()

      console.log("Response body:", body)

      /**
       * Validamos
       */
      expect(Array.isArray(body)).toBeTruthy()
      expect(body.length).toBeGreaterThan(0)
    })
  })

})