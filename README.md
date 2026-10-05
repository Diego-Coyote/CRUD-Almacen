# Sistema CRUD de Almacén

Proyecto sencillo de inventario con inicio de sesión y operaciones CRUD.

## Tecnologías

- SQL Server
- Procedimientos almacenados
- Node.js
- Express
- JWT
- bcrypt
- HTML
- CSS
- JavaScript

## Estructura

```text
crud_almacen/
├── backend/
│   ├── src/
│   │   ├── configuracion/
│   │   ├── controladores/
│   │   ├── middlewares/
│   │   ├── rutas/
│   │   ├── servicios/
│   │   ├── utilidades/
│   │   ├── aplicacion.js
│   │   └── servidor.js
│   ├── .env.example
│   └── package.json
├── base_datos/
│   ├── 01_crear_base_datos.sql
│   ├── 02_procedimientos_almacenados.sql
│   └── 03_datos_prueba.sql
└── frontend/
    ├── css/
    ├── js/
    │   └── componentes/
    ├── index.html
    └── almacen.html
```

## Base de datos

La solución utiliza solamente dos tablas principales:

1. `Usuarios`: credenciales y estado del usuario.
2. `Productos`: información del inventario del almacén.

Todo el acceso a datos realizado por la aplicación se hace mediante procedimientos almacenados.

## Configuración

### 1. Crear la base de datos

Ejecuta en SQL Server, en este orden:

1. `base_datos/01_crear_base_datos.sql`
2. `base_datos/02_procedimientos_almacenados.sql`
3. `base_datos/03_datos_prueba.sql` (opcional)

### 2. Configurar el backend

Entra a la carpeta `backend`:

```bash
npm install
```

Copia `.env.example` como `.env` y modifica los valores según tu SQL Server.

Ejemplo:

```env
PUERTO=3000
BD_SERVIDOR=localhost
BD_PUERTO=1433
BD_USUARIO=sa
BD_CONTRASENA=TuContrasena
BD_NOMBRE=AlmacenDB
JWT_SECRETO=una_clave_larga_y_segura
JWT_EXPIRACION=2h
COOKIE_SEGURA=false
```

No subas el archivo `.env` al repositorio. El proyecto incluye `.gitignore` para evitarlo.

### 3. Crear el usuario administrador

Configura estas variables en `.env`:

```env
ADMIN_NOMBRE=Administrador
ADMIN_CORREO=admin@almacen.com
ADMIN_CONTRASENA=Admin123*
```

Después ejecuta:

```bash
npm run crear-admin
```

La contraseña se guarda como hash de bcrypt; no se guarda en texto plano.

### 4. Iniciar la aplicación

Modo desarrollo:

```bash
npm run desarrollo
```

Modo normal:

```bash
npm run iniciar
```

Abre:

```text
http://localhost:3000
```

## Inicio de sesión

El backend genera un JWT después de validar el correo y la contraseña. El token se guarda en una cookie `HttpOnly`, por lo que JavaScript del navegador no puede leerlo directamente.

Las rutas del CRUD requieren autenticación mediante middleware.

## Buenas prácticas incluidas

- Separación entre rutas, controladores y servicios.
- Variables sensibles almacenadas fuera del código mediante `.env`.
- Archivo `.env.example` sin credenciales reales.
- Contraseñas protegidas con bcrypt.
- JWT almacenado en cookie `HttpOnly`.
- Consultas parametrizadas.
- Procedimientos almacenados para acceso a datos.
- Middleware centralizado de autenticación y errores.
- Validación básica en frontend y backend.
- Componente reutilizable para el menú de navegación.
- Escape de texto al dibujar información recibida de la base de datos.
- Interfaz sencilla y neutral, sin dependencias visuales externas.
