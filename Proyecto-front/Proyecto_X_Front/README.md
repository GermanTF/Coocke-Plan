# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Alcance Inicial: Aplicación de Recetas de Cocina con Buscador
### Funcionalidades Principales:
1. **Formulario para crear recetas:**
- Los usuarios podrán agregar nuevas recetas con ingredientes, pasos a seguir, una imagen o un enlace a un video explicativo.
2. **Listado de recetas con buscador:**
- Las recetas creadas serán listadas y se podrán buscar por nombre o por los ingredientes utilizados.
3. **Valoración de recetas:**
- Los usuarios podrán dejar valoraciones a las recetas, posiblemente con un sistema de estrellas o puntuación.
4. **Listado de compras para menús:**
Los usuarios podrán generar listas de compras basadas en los ingredientes necesarios para un menú.
5. Creación de menús:
- Los usuarios podrán combinar varias recetas para crear un menú personalizado.


### Componentes Iniciales y Responsables:
1. **Header** – German:
- Encabezado de la aplicación que incluirá el logo y navegación básica.
2. **Barra de navegación** – Andres:
- Barra lateral o superior con opciones para acceder a las diferentes secciones de la app (recetas, crear recetas, menús, etc.).
3. **Footer** – (Pendiente):
- Pie de página con información adicional, enlaces útiles o créditos.
4. **Formulario para ingresar recetas** – Iduar:
- **Campos recomendados para el formulario:**
    - **Nombre de la receta:** Campo de texto para que el usuario ingrese el título de la receta.
    - **Descripción breve:** Texto breve que describa la receta (por ejemplo, 1-2 líneas).
    - **Lista de ingredientes:** Campo dinámico donde los usuarios puedan agregar ingredientes uno por uno (cada ingrediente con su cantidad y unidad de medida).
        - Ejemplo: Tomate, 2, Unidades
    - **Instrucciones:** Se agregan como una lista dinámica. Cada vez que el usuario desee agregar un paso, puede hacerlo mediante el botón **"Añadir Paso"**, y cada paso será un campo de entrada separado.
    - **Tiempo de preparación:** Campo numérico para ingresar los minutos que toma preparar la receta antes de cocinar.
    - **Tiempo de cocción:** Campo numérico para ingresar los minutos de cocción (este ya lo tienes).
    - **Tiempo total:** Este campo se calcula automáticamente sumando el tiempo de preparación y el tiempo de cocción.
    - **Porciones:** Campo numérico que indique para cuántas personas es la receta.
    - **Nivel de dificultad:** Permitir al usuario seleccionar entre las opciones de dificultad de la receta (fácil, medio, difícil), como lo habías mencionado.
        - Ejemplo: Menú desplegable con Fácil, Medio, Difícil.
    - **Categoría de la receta:** Un menú desplegable para seleccionar la categoría (ejemplo: postre, entrada, plato principal, bebida, etc.).
    - **Etiquetas:** Campo donde el usuario pueda agregar etiquetas para clasificar la receta (ejemplo: vegano, sin gluten, bajo en calorías, etc.).    
    - **Enlace a video:** Campo de texto para pegar la URL de un video de la receta (por ejemplo, de YouTube).
    - **Foto de la receta:** Campo de carga de imágenes para permitir que el usuario suba una foto.
    - **Información nutricional (opcional):** Campos para ingresar información nutricional, como calorías, proteínas, grasas, carbohidratos, etc.
    - **Notas del cocinero:** Campo de texto para permitir al usuario agregar consejos o sugerencias adicionales.
        - Ejemplo: “Puedes sustituir el azúcar por miel” o “Este plato se puede hacer vegano eliminando el queso”.
    - **Valoración:** Campo donde el usuario puede establecer una valoración o calificación (en estrellas, por ejemplo) o puntuación del 1 al 5. Esto le dará a la comunidad la oportunidad de identificar las recetas mejor calificadas.
- **Funcionalidades extra:**
    - **Campos dinámicos:** Para la lista de ingredientes e instrucciones, podrías agregar funcionalidad que permita a los usuarios agregar o quitar filas dinámicamente.
    - **Validaciones:** Asegurarte de que campos como nombre, ingredientes, tiempo de cocción, y nivel de dificultad sean requeridos antes de enviar el formulario.    
5. **Listado de recetas** – (Pendiente):
- Vista en formato de tarjeta o lista que mostrará las recetas y permitirá acceder a sus detalles.
6. **Receta del día** – Miguel:
- Receta destacada que cambia diariamente, seleccionada de forma aleatoria o por criterios de popularidad.
7. **Recetas recientes** – David:
- Sección que muestra las recetas más recientes agregadas por los usuarios.
