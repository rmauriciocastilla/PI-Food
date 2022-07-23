# PI FOOD 🍱

Hola 👋, soy Mauricio Castilla.
Bienvenido al repositorio del PI de Food que desarrollé durante el bootcamp de Henry ✅.

## Front-End 🌕

Para el Front-End usé las siguientes tecnologias:
1. HTML 
2. CSS Puro
3. Javascript
4. React.JS
5. Redux.JS
6. Axios - Peticiones al Back

* La pagina esta conformada por una landing page con un boton que te dirige a la pagina principal.

* En el HOME, hay un NavBar para redirigirse a la landing page, un input para buscar recetas y un boton para dirigirse a crear una receta. Tambien, se encuentra la parte principal que muestra las recetas y los comandos para filtrar las recetas (nombre, puntaje, dietas, recetas[api o db])

* Al darle click a una receta podremos visualizar los datos principales de la receta (nombre, puntaje, imagen, dietas, puntaje, resumen y paso a paso)

* Al darle click al boton Create Recipe se renderiza un formulario controlado el cual tiene algunas restricciones permitiendo crear una receta con 0 errores.

## Back-end 🌑

Para el Back-End usé las siguientes tecnologias:
1. Javascript
2. Node.JS
3. Express.JS
4. Sequelize - ORM - Peticiones a la DB
5. Axios - Peticiones a la API
6. PostgreSQL - DB

En el BACK se podran hacer peticiones GET y POST
- POST /recipes -> Crear una receta
- GET /recipes -> Obtener todas las recetas (API y DB)
- GET /recipes?name=value -> Obtener todas las recetas donde el valor de busqueda coincidan con el nombre
- GET /recipes/:id -> Obtener una sola receta por su ID
- GET /diets -> Obtener todas las dietas


## Configuración

Para poder usar la aplicacion, sera necesario hacer las siguientes configuraciones:
1. Registrate en https://spoonacular.com/food-api para poder obtener una API KEY, esta es necesario para poder consumir la API.

2. Crea un archivo .env donde tendras que escribir las siguientes variables
DB_USER=Usurio postgresql
DB_PASSWORD=Contraseña postgresql
DB_HOST=Host db (usualmente localhost)
YOUR_API_KEY=Api key obtenida en spoonacular.com

3. Deberas crear una DB llamada __food__ en postgresql, la cual sera donde se guarden las dietas y las recetas.

