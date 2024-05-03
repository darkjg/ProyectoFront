# Lista de la compra-(Front)
Esta es la parte del front de este proyecto , realizado para facilitar la creacion de listas de la compra que se añadirian a una nevera virtual para tener mayor control de las necesidades de comprar en todo momento aparte de poder compartir recetas

## Tabla de contenidos
- [Instalacion](#Instalacion)
- [Uso](#Uso)
- [License](#license)
- [Otros Ejemplos](#otros-ejemplos)
  - [Bloques de códigos](#bloques-de-códigos)
  - [Resaltar texto](#resaltar-texto)
  - [Badges](#badges)
  - [Imagen](#imagen)


## Instalacion 🚀
Clonar el repositorio, luego en una terminal ejecutar npm i para instalar todos los modulos necesarios para el funcionamiento de la aplicacion una vez se tiene que generarel archivo .env VITE_SERVER_URL="" y substituir las comillas por el endpoint a usar, hecho esto usar el comando npm run dev


## Uso 
Una vez inicializado  vite nos proporcionarar una url como : http://localhost:5173/ y se nos mostrara la home  ![Home](imgs/Home.PNG), en la barra lateral podremos ver la navegacion la paguina de Registro ![Registro](imgs/Registro.PNG) y Login ![Login](imgs/Login.PNG)

lo primero sera registrarnos para poder acceder al Login y asi acceder a todo el contenidos
una vez Logueados tendremos las siguientes ventanas
La Home  ![HomeLoguado](imgs/HomeLoguado.PNG)En la que ademas de ver la receta del mes, podremos ver las listas que tenemos pendientes

La nevera ![Nevera](imgs/Nevera.PNG) Donde podremos ver todos los ingredientes que tenemos guardados

Las listas ![Listas](imgs/CrearListas.PNG) Donde podremos ver nuestras listas ya creadas al hacer click en su nombre , eliminarlas al hacer click en el boton de eliminar o crear una nueva lista

En caso de hacer click en el nombre de una lista nos llevara a editar la lista  ![EditarLista](imgs/EditarListas.PNG) Aqui podemos cambiar el nombre de la lista, ver los productos que tenemos en la lista o añadir nuevos productos a esta 

Por ultimo tendremos la paguina de Recetas ![Recetas](imgs/Recetas.PNG) Aqui podremos ver las distintas recetas creadas por toda la comunidad, obtener las recetas segun lo que tenemos en la nevera, la que se ha calificado como la mejor del mes o por ultimo buscar recetas por un ingrediete.
Ademas podremos editar las ya existentes con el boton actualizar, eliminarlas o Crear nuevas recetas con el boton de Crear recetas

En la paguina de Crear Recetas o Actualizar ![CrearReceta](imgs/CrearReceta.PNG) Podremos Crear nuevas recetas Añadiendo un nombre a esta , explicando como se realiza, y añadiendo los ingredientes que se usaran para llevar a cabo esta receta.


Por ultimo tendremos el Logout , que nos servira para desconectarnos.


