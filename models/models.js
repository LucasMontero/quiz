var path = require('path');

//Cargar Modelo ORM

var Sequelize = require('sequelize');

//Usar BBDD SQLite

var sequelize = new Sequelize(null, null, null, {dialect:'sqlite', storage:'quiz.sqlite'});

//Importar la definición de la tabla quiz en quiz.js

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; //Exporta la definició de la tabla quiz


//sequelize.sync crea e inicializa la tabla de preguntas en DB

sequelize.sync().success(function(){
	//succes(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count == 0){ //La tabla se inicializa solo si está vacía
			Quiz.create({
				pregunta: '¿Cúal es la capital de Italia?',
				respuesta: 'Roma'
			}).success(function(){console.log('Base de datos inicializada')});
		};
	});
});