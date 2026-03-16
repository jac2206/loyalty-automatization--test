# Loyalty Automation Testing

Proyecto de automatización de pruebas de API utilizando **Playwright**.

El objetivo es validar endpoints del backend de Loyalty.

---

# Tecnologías utilizadas

- Node.js
- Playwright
- TypeScript
- API Testing

---

# Instalación del proyecto

Clonar el repositorio:

```
git clone <repo>
cd loyalty-automation
```

Instalar dependencias:

```
npm install
```

Instalar navegadores de Playwright:

```
npx playwright install
```

---

# Configuración

El proyecto utiliza variables de entorno.

Archivo `.env`

```
BASE_URL=https://loyalty-backend-production-545b.up.railway.app/loyalty
```

Esta URL se utiliza como base para todas las llamadas HTTP.

Ejemplo de endpoint real:

```
BASE_URL + /v1/users/login
```

---

# Ejecutar pruebas

```
npm test
```

o

```
npx playwright test
```

---

# Ver reporte

```
npx playwright show-report
```

Esto abrirá un dashboard HTML con los resultados.

---

# Arquitectura del proyecto

```
src
│
├── tests
│
│   Contiene los casos de prueba.
│   Solo valida comportamiento.
│
├── services
│
│   Contiene llamadas HTTP a la API.
│   Evita repetir lógica en los tests.
│
├── data
│
│   Contiene datos de prueba reutilizables.
│
├── fixtures
│
│   Contiene configuraciones automáticas
│   que se ejecutan antes de los tests.
│
│   Ejemplo:
│   Generar token automáticamente.
```

---

# Flujo de ejecución

```
Test
 ↓
Service
 ↓
API
 ↓
Response
 ↓
Validación
```

---

# Casos de prueba implementados

### Login exitoso

Valida que un usuario válido pueda autenticarse
y que la API devuelva un token.

### Login con credenciales incorrectas

Valida que la API rechace credenciales inválidas.

### Login con body vacío

Valida que el endpoint maneje errores correctamente.

---

# Buenas prácticas utilizadas

- Separación de responsabilidades
- Service layer pattern
- Datos reutilizables
- Logs para debugging
- Reportes automáticos

---

# Próximos pasos

- Automatizar endpoints protegidos
- Usar fixtures para autenticación automática
- Automatizar flujos completos de negocio