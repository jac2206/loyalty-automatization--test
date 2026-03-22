import { APIRequestContext } from '@playwright/test'

/**
 * Obtener transacciones por usuario
 */
export async function getTransactionsByUser(
  request: APIRequestContext,
  token: string,
  documentType: string,
  documentNumber: string
) {

  return await request.get(`/loyalty/v1/transactions/${documentType}/${documentNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

}