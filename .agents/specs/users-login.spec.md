# Spec: users y login

## Archivos

- Service: `src/services/users.service.ts`
- Data: `src/data/users.ts`
- Fixture: `src/fixtures/auth.fixture.ts`
- Tests: `src/tests/api/users/login.spec.ts`, `users.spec.ts`

## Escenarios

| ID | Escenario | Resultado esperado |
|---|---|---|
| USER-001 | Login válido | `200` y `token` |
| USER-002 | Credenciales inválidas | `401` |
| USER-003 | Body vacío | `422` |
| USER-004 | `users/me` con token válido | `200` y datos del usuario |
| USER-005 | `users/me` con token inválido | `401`, `INVALID_TOKEN` |
| USER-006 | Obtener usuarios autenticado | `200` y lista no vacía |

El token debe viajar como `Authorization: Bearer <token>` y nunca imprimirse en logs.
