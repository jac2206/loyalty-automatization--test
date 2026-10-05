# Arquitectura de la automatización API

El documento conserva el nombre histórico `backend.architecture.md`, pero describe únicamente las pruebas Playwright del backend.

```text
Test API
  ↓
Fixture de autenticación (opcional)
  ↓
Service
  ↓
Endpoint Loyalty
  ↓
Status + contrato + evidencia
```

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| Datos | `src/data` | Payloads y usuarios reutilizables |
| Fixture | `src/fixtures` | Preparar token y contexto |
| Service | `src/services` | Construir requests y headers |
| Test | `src/tests/api` | Ejecutar escenarios y aserciones |
| Configuración | `playwright.config.ts` | Ambiente, navegador y reportes |

Para UI, el test usa `page` directamente y locators accesibles. No se replica la arquitectura interna del backend.
