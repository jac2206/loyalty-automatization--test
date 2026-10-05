# Spec: autenticación y sesión

## Objetivo

Verificar que un usuario pueda autenticarse con credenciales válidas y que la API rechace credenciales inválidas, body vacío o tokens no válidos.

## Alcance

- `POST /loyalty/v1/users/login`
- `GET /loyalty/v1/users/me`
- `src/tests/api/users/login.spec.ts`
- `src/tests/api/users/users.spec.ts`

## Escenarios

| ID | Escenario | Resultado esperado |
|---|---|---|
| AUTH-001 | Login válido | `200` y propiedad `token` |
| AUTH-002 | Credenciales inválidas | `401` |
| AUTH-003 | Body vacío | `422` |
| AUTH-004 | Perfil con token válido | `200` y datos del usuario |
| AUTH-005 | Perfil con token inválido | `401`, `INVALID_TOKEN` |

## Criterios de aceptación

- El token se envía como Bearer en rutas protegidas.
- El fixture no debe registrar tokens en consola.
- Las credenciales deben provenir de un mecanismo seguro y no del código fuente.
