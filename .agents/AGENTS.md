# Agente del proyecto

Este repositorio es exclusivamente una suite de automatización con Playwright y TypeScript para validar la API y la UI de Loyalty.

## Estructura real

```text
src/
├── data/                 Datos de prueba.
├── fixtures/             Contextos reutilizables, incluido auth.
├── services/             Funciones que encapsulan requests HTTP.
└── tests/
    ├── api/
    │   ├── users/
    │   ├── accounts/
    │   └── transactions/
    ├── ui/
    └── example.spec.ts
playwright.config.ts
```

## Reglas obligatorias

- Usar Playwright Test como runner único.
- Mantener requests en `src/services`.
- Mantener datos en `src/data`.
- Reutilizar `src/fixtures/auth.fixture.ts` para endpoints protegidos.
- Mantener las aserciones y escenarios en `src/tests`.
- Preferir tipos explícitos; no agregar `any` en cambios nuevos.
- Usar `test.step` para acción y validación.
- No usar `test.only`, esperas arbitrarias ni dependencias entre tests.
- No guardar credenciales, tokens ni datos sensibles en el repositorio.

## Flujo de trabajo

1. Revisar la spec correspondiente en `.agents/specs`.
2. Revisar el service, fixture y data relacionados.
3. Implementar el escenario en el directorio de test correcto.
4. Ejecutar el test específico y luego el grupo afectado.
5. Actualizar la spec si cambia el comportamiento cubierto.

## Verificación

```bash
npx playwright test src/tests/api/users/login.spec.ts
npx playwright test --project=chromium
```

No introducir dependencias ni documentación de Express, Swagger u otros runners en este proyecto.
