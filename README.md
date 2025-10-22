# ✨ Conexión a una API mediante HTTP, AJAX, jQuery y manejo de errores

📌 Proyecto: Práctica evaluada — Conexión a una API (Harry Potter API)  
👨‍💻 Autor: Fabrizio Franco  
📚 Matrícula / Curso: Electiva II  
👩‍🏫 Profesora: Sabrina Colmenarez  
📅 Fecha de entrega: 24 de Octubre del 2025

---

## 📝 Descripción
Práctica para demostrar la conexión desde el front-end a una API REST usando técnicas HTTP/AJAX con manejo de errores y presentación de datos en la interfaz. El proyecto consume datos del universo de Harry Potter 🪄 y muestra la integración entre la lógica JavaScript y la UI disponible en el repositorio.

⚠️ Importante: Este README no añade ejemplos de código que no estén ya presentes en tu proyecto. Para ver implementaciones concretas (peticiones, manejo de errores, renderizado), revisa el archivo app/app.js incluido en este repositorio.

## Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript
- jQuery (si está incluido en el proyecto)
- API pública (HP-API u otra según tu implementación)

## API utilizada (referencia)
La práctica está pensada para trabajar con la API pública HP-API: https://hp-api.onrender.com/  
(sustituye por la API real que uses si corresponde). Consulta app/app.js para confirmar la URL/base y los endpoints que efectivamente usa tu código.

Ejemplos de endpoints que suelen usarse con HP-API:
- GET /api/characters
- GET /api/characters/students
- GET /api/characters/staff
- GET /api/characters/house/:house

## 📂 Estructura exacta del proyecto
Este README refleja únicamente los archivos y carpetas que existen actualmente en el repositorio:

- index.html
- app/
  - app.js
- lib/ (carpeta presente en el repo)
- styles/ (carpeta presente en el repo)
- README.md (este archivo)

Si en algún momento deseas que añada la lista completa de archivos dentro de `lib/` o `styles/`, dímelo y lo incluyo.

## Dónde está la lógica relevante
- app/app.js — Aquí está la lógica principal del front-end: llamadas a la API, renderizado y manejo de errores. Revisa este archivo para ver exactamente cómo se realizan las peticiones (fetch, $.ajax, etc.), los mensajes de error y la gestión de estados (cargando/errores).
- index.html — Contiene la estructura de la interfaz y referencias a scripts/estilos.
- styles/ — Contiene los estilos CSS del proyecto.
- lib/ — Contiene librerías/recursos (revisa su contenido si quieres detallar dependencias).

## Cómo ejecutar el proyecto localmente
1. Clona el repositorio:
   git clone https://github.com/Fabrizio-Franco1405/Harry-Potter-Api.git
2. Entra en la carpeta:
   cd Harry-Potter-Api
3. Abrir en el navegador:
   - Opción rápida: abrir index.html directamente (algunas APIs o llamadas pueden requerir servidor por CORS).
   - Recomendado: servir con un servidor local:
     - Live Server (VSCode): "Go Live".
     - Python 3:
       python -m http.server 5500
       y abrir http://localhost:5500

Nota: Si la implementación de las peticiones requiere cabeceras o una API key, revisa app/app.js y actualiza los datos necesarios antes de ejecutar.

## Manejo de errores (orientación)
He aquí recomendaciones y puntos a verificar en tu código (sin añadir ejemplos que no estén en tu repo):
- Mostrar un estado "Cargando..." mientras se realizan peticiones.
- Comprobar códigos HTTP (200 OK vs 4xx/5xx) y mostrar mensajes claros al usuario.
- Manejar errores de red (timeout / sin conexión).
- Validar la estructura de la respuesta antes de usar los datos (evitar excepciones por campos faltantes).
- Usar placeholders para imágenes o campos vacíos.
- Registrar errores en consola para depuración y, opcionalmente, mostrar mensajes más amigables en la UI.

Para ver cómo está implementado todo lo anterior en tu práctica, abre app/app.js.

## Criterios de evaluación sugeridos
- Conexión correcta a la API y obtención de datos: 40%
- Manejo correcto de errores y experiencia de usuario: 25%
- Interfaz y usabilidad (presentación, filtros, búsqueda): 20%
- Código limpio y documentado: 15%

Adapta estos porcentajes según la rúbrica que te haya entregado la profesora.

## Licencia
MIT License

Copyright (c) 2025 Fabrizio Franco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
