# Patrones Playwright

## API service layer

Los tests llaman funciones de `src/services`; allí se centralizan método, ruta, payload y headers. El service retorna `APIResponse` y el test decide qué contrato validar.

## Fixture de autenticación

`auth.fixture.ts` hace login con un usuario de prueba y expone `authToken` a los tests protegidos. Nunca debe registrar el token.

## Datos por intención

Nombrar objetos como `validUser`, `invalidTransactionsAccumulate` o `negativeAmountAccumulate` según el escenario que representan.

## Aserciones

Validar status HTTP, propiedades esenciales y estructura de errores. Evitar aserciones sobre campos no contractuales.

## UI

Usar `getByRole`, `getByLabel` y URLs observables. Evitar selectores frágiles y `waitForTimeout`.
