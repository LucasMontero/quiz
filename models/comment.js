//Definición del modelo para la tabla comentarios.

module.exports = function(sequelize, DataTypes){
	return sequelize.define(
		'Comment',
		{texto: {
					type: DataTypes.STRING,
					validate: { notEmpty: {msg: "--> Falta comentario."}}
				}
		}
	);
};