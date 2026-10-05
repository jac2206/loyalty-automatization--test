# Spec: accounts

## Archivos

- Service: `src/services/accounts.service.ts`
- Data: `src/data/users.ts`
- Fixture: `src/fixtures/auth.fixture.ts`
- Test: `src/tests/api/accounts/accounts.spec.ts`

## Escenarios

| ID | Escenario | Resultado esperado |
|---|---|---|
| ACC-001 | Consultar saldo de usuario válido | `200`, balance y documento |
| ACC-002 | `documentType` inválido | `422`, `VALIDATION_ERROR` |
| ACC-003 | Cuenta inexistente | `404`, `ACCOUNT_NOT_FOUND` |
