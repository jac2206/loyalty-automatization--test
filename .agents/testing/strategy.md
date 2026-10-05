# Estrategia de testing

## Capas

- API: cobertura principal de users/login, accounts y transactions.
- UI: flujo crítico de login.
- Unitarias: no forman parte de este proyecto actualmente.

## Ejecución

- Local: Chromium y sin retries.
- CI: retries, un worker y `forbidOnly` según `playwright.config.ts`.
- Evidencia: reporter HTML, screenshot y trace en fallos.

## Prioridades

1. Retirar el log del token del fixture.
2. Parametrizar la URL UI.
3. Tipar payloads y respuestas.
4. Aislar transacciones creadas por pruebas.
5. Añadir ejecución CI con secretos seguros.
