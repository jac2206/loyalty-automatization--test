# Spec: transactions

## Archivos

- Service: `src/services/transactions.service.ts`
- Data: `src/data/transactions.ts`
- Fixture: `src/fixtures/auth.fixture.ts`
- Test: `src/tests/api/transactions/transactions.spec.ts`

## Escenarios

| ID | Escenario | Resultado esperado |
|---|---|---|
| TX-001 | Consultar transacciones válidas | `200` y arreglo `transactions` |
| TX-002 | Parámetro inválido | `422`, `VALIDATION_ERROR` |
| TX-003 | Acumular puntos en cuenta válida | `201`, puntos y balance |
| TX-004 | Acumular en cuenta inexistente | `404`, `ACCOUNT_NOT_FOUND` |
| TX-005 | Monto enviado como string | `422`, `VALIDATION_ERROR` |
| TX-006 | Monto negativo | `422`, error sobre `amount` |

Los escenarios que mutan saldo deben usar datos controlados y no depender del orden de ejecución.
