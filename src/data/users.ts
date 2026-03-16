/**
 * Datos de prueba reutilizables para los tests.
 *
 * Ventaja:
 * No repetimos datos dentro de cada test.
 * Si cambian los datos solo modificamos este archivo.
 */

/**
 * Usuario válido para login
 */
export const validUser = {
  email: "arango773@gmail.com",
  password: "Jac.112206"
}

/**
 * Usuario inválido para probar errores
 */
export const invalidUser = {
  email: "test@test.com",
  password: "wrongpassword"
}