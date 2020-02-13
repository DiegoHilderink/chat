# Chat

Chat realizado en bases de **JQuery**, **HTML** y **CSS**.
Se emplea la **API ScaleDrone** para el envío de datos asíncronos.


Deberá ejecutar `npm install` para agregar las dependencias necesarias o comentar la llamada al código de llamada al módulo de jquery y decomentar el script de enlace url a jquery.

```
<!-- <script type='text/javascript' src='https://code.jquery.com/jquery-3.4.1.min.js'></script> -->
<script src="./node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
```

Se divide en dos ficheros, el principal o `drone.js` y el `aux.js`.

##### drone.js
* Almacena todo lo necesario para realizar una perfecta conexión con el sistema **Scaledrone**.

* Se encarga de la creación de usuarios y de la gestión de usuarios conectados.
```
 function setScaleDrone(client, name, color) {
    return new ScaleDrone(client, {
        data: {
            name: name,
            color: color,
        },
    })
}

let members = [];                      // Array de usuarios conectados 
const ID_CLIENT = 'pSXeeXv7KFZr7Bqh';  // Clave de conexión a scaledrone
const drone = setScaleDrone(           // Generación de usuario
                ID_CLIENT, 
                getRandomName(),       // Nombre de usuario
                getRandomColor()       // Color del usuario en chat
              );

```

* Los nombres por ahora son generados de forma aleatoria. Más tarde será implementada una base de datos que recoja los usuarios de esta.

##### code.js
* Contiene todo lo relacionado a las funciones relativas como `getRandomName()` o `getRandomColor`. 

* Actualiza el DOM en caso de recibir nuevos datos.

* Crea la forma de los mensajes. 

