# Job Simulator — API REST de Videojuegos

API REST con operaciones CRUD completas para gestión de un catálogo de videojuegos. Construida con Node.js + Express, persistencia en PostgreSQL y entorno completamente containerizado con Docker.

---

## Stack

- **Backend:** Node.js 20 + Express
- **Base de datos:** PostgreSQL 16
- **Containerización:** Docker + Docker Compose
- **Frontend:** HTML + Tailwind CSS servido por Nginx

---

## Requisitos

- Docker
- Docker Compose

---

## Levantar el sistema

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd <nombre-del-repo>

# 2. Crear el archivo de variables de entorno
cp .env.example .env

# 3. Levantar todos los servicios
docker compose up --build
```

El sistema queda disponible en:

| Servicio  | URL                        |
|-----------|----------------------------|
| API       | http://localhost:8080      |
| Frontend  | http://localhost:8088      |

> La API espera a que PostgreSQL esté saludable antes de arrancar. No se requiere ninguna intervención manual.

---

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar los valores si es necesario:

```env
DB_HOST=db
DB_PORT=5432
DB_NAME=jobsimulator
DB_USER=user
DB_PASSWORD=password

APP_PORT=8080
```

---

## Recurso: Videojuegos

### Estructura

| Campo    | Tipo    | Descripción           | Restricciones              |
|----------|---------|-----------------------|----------------------------|
| `id`     | integer | Identificador único   | primary key, autoincrement |
| `campo1` | string  | Título del videojuego | requerido                  |
| `campo2` | string  | Género                | requerido                  |
| `campo3` | string  | Plataforma            | requerido                  |
| `campo4` | integer | Año de lanzamiento    | requerido                  |
| `campo5` | float   | Precio                | requerido                  |
| `campo6` | boolean | Disponible            | requerido                  |

---

## Endpoints

Base URL: `http://localhost:8080`

### GET /products
Retorna todos los videojuegos.

```bash
curl http://localhost:8080/products
```

**Respuesta `200 OK`:**
```json
[
  {
    "id": 1,
    "campo1": "The Legend of Zelda: Breath of the Wild",
    "campo2": "Aventura",
    "campo3": "Nintendo Switch",
    "campo4": 2017,
    "campo5": 449.99,
    "campo6": true
  }
]
```

---

### GET /products/:id
Retorna un videojuego por ID.

```bash
curl http://localhost:8080/products/1
```

**Respuesta `200 OK`:** objeto del videojuego.

**Respuesta `404 Not Found`:**
```json
{ "error": "Not found" }
```

---

### POST /products
Crea un nuevo videojuego.

```bash
curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{
    "campo1": "Elden Ring",
    "campo2": "RPG",
    "campo3": "PC",
    "campo4": 2022,
    "campo5": 399.99,
    "campo6": true
  }'
```

**Respuesta `201 Created`:** objeto creado con su `id`.

**Respuesta `422 Unprocessable Entity`:** si falta algún campo o el tipo es incorrecto.

---

### PUT /products/:id
Actualiza un videojuego completo por ID.

```bash
curl -X PUT http://localhost:8080/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "campo1": "Elden Ring",
    "campo2": "RPG",
    "campo3": "PS5",
    "campo4": 2022,
    "campo5": 349.99,
    "campo6": true
  }'
```

**Respuesta `200 OK`:** objeto actualizado.

**Respuesta `404 Not Found`:** si el ID no existe.

---

### DELETE /products/:id
Elimina un videojuego por ID.

```bash
curl -X DELETE http://localhost:8080/products/1
```

**Respuesta `204 No Content`:** eliminado correctamente.

**Respuesta `404 Not Found`:** si el ID no existe.

---

## Validaciones

Todos los campos son requeridos. Los tipos se validan estrictamente:

| Campo    | Tipo esperado | Error si no cumple                        |
|----------|---------------|-------------------------------------------|
| `campo1` | string        | `422` — campo1, campo2, campo3 must be strings |
| `campo2` | string        | `422` — campo1, campo2, campo3 must be strings |
| `campo3` | string        | `422` — campo1, campo2, campo3 must be strings |
| `campo4` | integer       | `422` — campo4 must be an integer         |
| `campo5` | float/number  | `422` — campo5 must be a number           |
| `campo6` | boolean       | `422` — campo6 must be a boolean          |

---

## Estructura del proyecto

```
.
├── api/
│   ├── src/
│   │   ├── server.js      # Punto de entrada, configuración Express y CORS
│   │   ├── routes.js      # Definición de endpoints CRUD
│   │   └── db.js          # Conexión a PostgreSQL e inicialización del esquema
│   ├── package.json
│   └── Dockerfile
├── fronted/
│   ├── public/
│   │   ├── index.html     # Listado de videojuegos
│   │   ├── create.html    # Formulario de creación
│   │   ├── edit.html      # Formulario de edición
│   │   ├── show.html      # Vista de detalle
│   │   └── js/
│   │       ├── config.js  # URL base de la API y nombre del recurso
│   │       ├── api.js     # Funciones fetch para cada endpoint
│   │       ├── index.js   # Lógica del listado
│   │       ├── create.js  # Lógica del formulario de creación
│   │       ├── edit.js    # Lógica del formulario de edición
│   │       └── show.js    # Lógica de la vista de detalle
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Servicios Docker

```yaml
db:       PostgreSQL 16 — espera healthcheck antes de permitir conexiones
api:      Node.js 20    — arranca solo cuando db está healthy
frontend: Nginx alpine  — sirve los archivos estáticos del frontend
```

---

## Nivel de entrega

**Senior** — incluye:
- PostgreSQL con dos servicios independientes
- Variables de entorno sin valores hardcodeados
- Healthcheck con `condition: service_healthy`
- `.env.example` documentado
- `.gitignore` configurado
- Separación de responsabilidades: `db.js`, `routes.js`, `server.js`
- Integración full stack en un único `docker-compose up`
- Frontend personalizado con dominio de videojuegos (sin `campo1..campo6` visibles)
