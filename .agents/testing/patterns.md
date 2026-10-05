# Patrones de testing

## API

1. Preparar datos y auth.
2. Ejecutar el service.
3. Validar status.
4. Parsear el body una vez.
5. Validar contrato y error relevante.

## UI

Usar locators accesibles, navegación explícita y validación de URL o mensaje visible.

## Aislamiento

No compartir estado mutable entre tests. Las pruebas de acumulación requieren datos controlados para tolerar ejecución paralela.
