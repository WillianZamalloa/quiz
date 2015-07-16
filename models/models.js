var path = require('path');
//Cargar modelo ORM
var Sequelize = require('sequelize');
//Usar la BBDD SQLite
var sequelize = new Sequelize(null, null, null,
                      {dialect: "sqlite", storage:"quiz.sqlite"}
                    );
//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;//exporta la definicion de la tabla Quiz

//sequelize.sync() crea e inicializa ta la de preguntas de la DB
//sequelize.sync().success(function(){ //anterior version
sequelize.sync().then(function(){
  //success(..) ejecuta el manejador una vez creada la tabla
  //Quiz.count().success(function(){
  Quiz.count().then(function(count){
    if (count == 0) {//la tabla se inicializa solo si esta vacia
      Quiz.create({ pregunta: 'Capital de Roma',
                    respuesta: 'Roma'
                  }) //.success(function(){console.log('Base de Datos Inicializada');})
      .then(function(){console.log('Base de Datos Inicializada');})
    };
  });
});
