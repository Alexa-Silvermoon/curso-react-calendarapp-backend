# Notas
Este es el lado backend de curso-react-10-calendarapp en Node.js
Lado del frontend: https://github.com/Alexa-Silvermoon/curso-react-10-calendarapp

No olvidar reconstruir la carpeta node_modules con el comando:
```
npm install
```

COMANDOS PARA EJECUTAR EN EL CMD:
```
node index.js    o bien     nodemon index.js
```

VERIFICAR EN POSTMAN EL ENTORNO {{url}} YA SEA DESARROLLO O PRODUCCION:
```
http://localhost:4000/ <-- desarrollo

Auth - Crear usuario:   localhost:4000/api/auth/new
Auth - Crear Login:     localhost:4000/api/auth
Auth - Revalidar JWT:   localhost:4000/api/auth

Events - crearEvento:        localhost:4000/api/events
Events - getEventos:         localhost:4000/api/events
Events - actualizarEvento:   localhost:4000/api/events/ID_MONGO
Events - eliminarEvento:     localhost:4000/api/events/ID_MONGO

```