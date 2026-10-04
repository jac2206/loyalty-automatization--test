/**
 * Datos de prueba reutilizables para los tests.
 *
 * Ventaja:
 * No repetimos datos dentro de cada test.
 * Si cambian los datos solo modificamos este archivo.
 */

/**
 * Transacción válida para acumular puntos
 */
export const validTransactionsAccumulate = {
  documentType: "CC",
  documentNumber: "1037630472",
  partnerCode: "PARTNER_001",
  locationCode: "LOC_001",
  amount: 200000,
  reference: "COMPRA-ACUM-001"
}

/**
 * Transacción para cuenta no existente
 */
export const notAccountAccumulate = {
  documentType: "CC",
  documentNumber: "1111111",
  partnerCode: "PARTNER_001",
  locationCode: "LOC_001",
  amount: 200000,
  reference: "COMPRA-ACUM-001"
}

/**
 * Transacción enviada con datos inválidos para probar errores de validación
 */
export const invalidTransactionsAccumulate = {
  documentType: "CC",
  documentNumber: "1111111",
  partnerCode: "PARTNER_001",
  locationCode: "LOC_001",
  amount: "200000",
  reference: "COMPRA-ACUM-001"
}

/**
 * Transacción enviada con monto negativo para probar errores de validación
 */
export const negativeAmountAccumulate = {
  documentType: "CC",
  documentNumber: "1111111",
  partnerCode: "PARTNER_001",
  locationCode: "LOC_001",
  amount: -200000,
  reference: "COMPRA-ACUM-001"
}

