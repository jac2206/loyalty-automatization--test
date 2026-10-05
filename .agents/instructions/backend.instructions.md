# Instrucciones para automatización API

- Usar `APIRequestContext` de Playwright.
- Encapsular cada endpoint en `src/services`.
- Usar `auth.fixture.ts` en rutas protegidas.
- Cubrir caso exitoso, validación de entrada, autenticación y recurso inexistente cuando aplique.
- Validar status, contrato relevante y errores (`code`, `message`, `errors`).
- Mantener tests independientes y seguros para ejecución paralela.
