var users = {
	admin: {id: 1, username: 'admin', password:'1234'},
	lucas: {id: 2, username: 'lucas', password:'4567'}
};

//Comprueba si el usuario está registrado en users
//Si la autenticación falla o hay error llama a callback(error)
exports.autenticar = function(login, password, callback){
	if (users[login]){
		if (password === users[login].password){
			callback(null, users[login]);
		}
		else{
			callback(new Error('Password erróneo'));
		}
	}
	else{
		callback(new Error('El usuario no existe'));
	}
};