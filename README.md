# Task Management API

## Descripción

Esta API para la gestión de tareas está construida con NestJS. Permite crear, leer, actualizar y eliminar tareas, y valida los datos de entrada utilizando `class-validator`.

## Tecnologías Utilizadas

- [NestJS](https://nestjs.com/) - Framework para construir aplicaciones de servidor eficientes y escalables en Node.js.
- [class-validator](https://github.com/typestack/class-validator) - Librería para validación de clases en TypeScript.
- [class-transformer](https://github.com/typestack/class-transformer) - Librería para transformar objetos y clases en TypeScript.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Librería para el hashing seguro de contraseñas.
- [TypeORM](https://typeorm.io/) - ORM para manejar la interacción con bases de datos en TypeScript.


## Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/karenamor/task-management-api.git
    cd task-management-api
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

## Configuración

No se requiere configuración adicional. La aplicación utiliza la configuración predeterminada de NestJS.

## Uso

1. **Inicia el servidor:**

    ```bash
    npm run start:dev
    ```

   - El servidor se iniciará en `http://localhost:3000`. 
   - La documentación de la API estará disponible en `http://localhost:3000/api`.

    La API también está desplegada en Render y se puede acceder a ella en:
    - [https://task-manager-6tex.onrender.com/](https://task-manager-6tex.onrender.com/)
    - [Documentación en Render](https://task-manager-6tex.onrender.com/api)

2. **Endpoints disponibles:**

    - **POST /users/register**

      Crea un nuevo usuario.

      **Cuerpo de la solicitud:**
      ```json
      {
        "username": "Juan",
        "password": "securepassword"
      }
      ```

    - **POST /auth/login**

      Inicia sesión y devuelve un JWT.

      **Cuerpo de la solicitud:**
      ```json
      {
        "username": "Juan",
        "password": "securepassword"
      }
      ```

    - **GET /tasks?limit=5&page=5**

      Obtiene la lista de tareas.

      **Respuesta exitosa:**
      ```json
      [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "status": "string"
        }
      ]
      ```

    - **POST /tasks**

      Crea una nueva tarea. Requiere autenticación.

      **Cuerpo de la solicitud:**
      ```json
      {
        "title": "string",
        "description": "string",
        "status": "string"  // Opcional: 'open', 'in_progress', o 'done'
      }
      ```

      **Respuesta exitosa:**
      ```json
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "status": "string"
      }
      ```

    - **GET /tasks/:id**

      Obtiene una tarea específica por su ID.

      **Respuesta exitosa:**
      ```json
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "status": "string"
      }
      ```

    - **PUT /tasks/:id**

      Actualiza una tarea existente por su ID.

      **Cuerpo de la solicitud:**
      ```json
      {
        "title": "string",
        "description": "string",
        "status": "string"  // Opcional: 'open', 'in_progress', o 'done'
      }
      ```

      **Respuesta exitosa:**
      ```json
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "status": "string"
      }
      ```

    - **DELETE /tasks/:id**

      Elimina una tarea específica por su ID.

      **Respuesta exitosa:**
      ```json
      {
        "message": "Task deleted successfully"
      }
      ```

## Validaciones

La API utiliza `class-validator` para asegurar que los datos entrantes cumplan con los requisitos definidos en los DTOs. Los errores de validación se devuelven como errores 400 con detalles sobre las validaciones fallidas.

## Contribuciones

Si deseas contribuir a este proyecto, realiza un fork del repositorio, realiza tus cambios y envía un pull request.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

## Contacto

Para cualquier pregunta, contacta a [karedimor@gmail.com](mailto:karedimor@gmail.com).
