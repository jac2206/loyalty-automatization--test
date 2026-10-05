# Loyalty Automation Testing

Suite de automatización funcional para el backend y el frontend de Loyalty, construida con **Playwright + TypeScript**. El proyecto cubre pruebas API autenticadas, validaciones negativas, flujos UI de login y generación de evidencia de ejecución.

## Alcance

- Autenticación de usuarios mediante login y token JWT.
- Consulta de perfil y listado de usuarios.
- Consulta de saldo y transacciones.
- Acumulación de puntos para cuentas válidas y manejo de errores.
- Login web exitoso y fallido.
- Evidencia de fallos mediante screenshots y traces.

## Tecnologías

- Node.js y npm
- TypeScript
- Playwright Test 1.58+
- `dotenv` para configuración por entorno
- Reporter de lista y reporte HTML

## Requisitos e instalación

- Node.js 20 o superior recomendado.
- Acceso a los ambientes de Loyalty y credenciales de prueba.

```bash
npm install
npx playwright install
```

## Configuración

Crea un archivo `.env` en la raíz. No subas este archivo al repositorio.

```env
BASE_URL=https://loyalty-backend-production-545b.up.railway.app/loyalty
```

`BASE_URL` se usa como base de las pruebas API. Si no está definida, Playwright usa `http://localhost:3000/loyalty`.

La prueba UI de login apunta actualmente a `https://loyalty-web-mocha.vercel.app/login`; si se requiere otro ambiente, conviene parametrizar también esa URL.

## Ejecución

```bash
npm test
npm run test:ui
npm run test:headed
npm run report
```

También puedes ejecutar filtros de Playwright:

```bash
npx playwright test src/tests/api/users/login.spec.ts
npx playwright test src/tests/api --project=chromium
npx playwright test -g "should login successfully"
```

## Arquitectura

```text
src/
├── data/       Datos de prueba reutilizables.
├── fixtures/   Preparación compartida, incluido login y token JWT.
├── services/   Encapsulación de llamadas HTTP y headers.
└── tests/
    ├── api/    Pruebas de users, accounts y transactions.
    ├── ui/     Pruebas de interfaz web.
    └── example.spec.ts
```

Flujo API: `Test → Fixture (opcional) → Service → Endpoint → Response → Assertions`.

## Endpoints cubiertos

| Área | Operación | Cobertura actual |
|---|---|---|
| Users | `POST /loyalty/v1/users/login` | Éxito, credenciales inválidas y body vacío |
| Users | `GET /loyalty/v1/users/me` | Perfil válido y token inválido |
| Users | `GET /loyalty/v1/users` | Listado autenticado |
| Accounts | `GET /loyalty/v1/accounts/balance/{type}/{number}` | Saldo válido, parámetro inválido y cuenta inexistente |
| Transactions | `GET /loyalty/v1/transactions/{type}/{number}` | Listado válido y parámetro inválido |
| Transactions | `POST /loyalty/v1/transactions/accumulate` | Éxito, cuenta inexistente, monto inválido y negativo |

## Convenciones

- Nombrar tests con comportamiento observable: `should ...`.
- Mantener llamadas HTTP en `src/services` y datos en `src/data`.
- Reutilizar `auth.fixture.ts` para endpoints protegidos.
- Validar status, contrato relevante y errores esperados.
- No imprimir tokens ni credenciales en logs permanentes.
- No depender del orden entre pruebas; los escenarios que mutan datos deben usar referencias controladas.

## Reportes y evidencia

Playwright genera el reporte HTML en `playwright-report/`. En fallos se conservan screenshots y traces según `playwright.config.ts`; los artefactos temporales están excluidos de Git.

## Documentación SDD

Las decisiones y reglas para agentes se encuentran en [`.agents/AGENTS.md`](.agents/AGENTS.md). La documentación incluye arquitectura, instrucciones, skills, specs y estrategia de testing.

## Próximos pasos

- Parametrizar la URL del frontend mediante entorno.
- Añadir validación de esquemas de respuesta y tipos TypeScript.
- Separar datos mutables por ambiente y limpiar transacciones creadas por pruebas.
- Incorporar ejecución CI con variables seguras y reporte de resultados.
- Retirar `src/tests/example.spec.ts` cuando deje de ser necesario como smoke test.
