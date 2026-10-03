import { APIRequestContext } from "@playwright/test";

/**
 * Obtener saldo por usuario
 */
export async function getBalanceByUser(
  request: APIRequestContext,
  token: string,
  documentType: string,
  documentNumber: string
) {

  return await request.get(`/loyalty/v1/accounts/balance/${documentType}/${documentNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

}