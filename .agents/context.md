# Contexto del proyecto

## Propósito

Automatizar pruebas funcionales de Loyalty con Playwright: API autenticada, validaciones negativas y flujo UI de login.

## Componentes

- `src/data`: `users.ts` y `transactions.ts`.
- `src/fixtures`: login automático y exposición de `authToken`.
- `src/services`: users, accounts y transactions.
- `src/tests/api`: contratos de API.
- `src/tests/ui`: flujo web de login.
- `playwright.config.ts`: Chromium, `BASE_URL`, retries CI, reportes, screenshots y traces.

## Autenticación

El login usa `POST /loyalty/v1/users/login`. Las rutas protegidas reciben `Authorization: Bearer <token>`.

## Riesgos conocidos

- Algunos datos dependen de un ambiente compartido.
- La URL de UI está fija en el test y debe parametrizarse.
- El fixture no debe imprimir tokens.
- Los payloads de algunos services todavía requieren tipado.
