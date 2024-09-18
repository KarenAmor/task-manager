# Task Management API

## Descripción

Esta es una API para la gestión de tareas construida con NestJS. La API permite crear, leer, actualizar y eliminar tareas, y valida los datos de entrada utilizando `class-validator`.

## Tecnologías Utilizadas

- [NestJS](https://nestjs.com/) - Framework para construir aplicaciones de servidor eficientes y escalables en Node.js.
- [class-validator](https://github.com/typestack/class-validator) - Librería para validación de clases en TypeScript.
- [class-transformer](https://github.com/typestack/class-transformer) - Librería para transformar objetos y clases en TypeScript.

## Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/task-management-api.git
    cd task-management-api
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

## Configuración

No se requiere configuración adicional. La aplicación usa la configuración predeterminada de NestJS.

## Uso

1. **Inicia el servidor:**

    ```bash
    npm run start
    ```

    El servidor se iniciará en `http://localhost:3000`.
    Acceder a la documentación en `http://localhost:3000/api`.

2. **Endpoints disponibles:**

    - **GET /tasks**
      
      Obtiene la lista de todas las tareas.

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
      
      Crea una nueva tarea.

      **Cuerpo de la solicitud:**
      ```json
      {
        "title": "string",
        "description": "string",
        "status": "string"  // Opcional, puede ser 'open', 'in_progress', o 'done'
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
        "status": "string"  // Opcional, puede ser 'open', 'in_progress', o 'done'
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

Si deseas contribuir a este proyecto, por favor realiza un fork del repositorio, realiza tus cambios y envía un pull request.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

## Contacto

Para cualquier pregunta, por favor contacta a [karedimor@gmail.com](mailto:tu-email@dominio.com).