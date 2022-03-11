const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';

    //Conectar a db
    this.conectarDB();

    //Midedlewares
    this.middleware();
    
    //Rutas de la applicaíon
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
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
    this.app.use( this.authPath, require('../routes/auth'));
    this.app.use( this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto: ', this.port);
    });
  }

}

module.exports = Server;