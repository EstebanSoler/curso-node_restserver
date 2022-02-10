const express = require('express');
const cors = require('cors');


class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //Midedlewares
    this.middleware();
    
    //Rutas de la applicaíon
    this.routes();
  }

  middleware() {

    //CORS
    this.app.use(cors())

    //Lectura y parse del body
    this.app.use(express.json());

    //directorio publico
    this.app.use( express.static('public'));
  }

  routes(){
    this.app.use( '/api/usuarios', require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto: ', this.port);
    });
  }

}

module.exports = Server;