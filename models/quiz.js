//Definición del modelo Quiz

module.exports = function(sequelize, DataTypes){
	return sequelize.define(
		'Quiz',
 		{pregunta:  {type: DataTypes.STRING, validate: { notEmpty: {msg: "-> Falta la Pregunta"}}},
	     respuesta: {type: DataTypes.STRING, validate: { notEmpty: {msg: "-> Falta la Respuesta"}}},
	     categoria: {type: DataTypes.STRING, allowNull: false, validate: { notEmpty: {msg: "-> Seleccione categoria"}}}
 		}
 	);
}

 