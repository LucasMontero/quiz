var express   = require('express');
var router 	  = express.Router();
var textTitle = "Quiz"

var quizController    = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', {title: textTitle, errors:[]});
});

/* GET Authors page. */
router.get('/Authors', function(req, res) {
  	res.render('authors', {title: textTitle, errors:[]});
});

/* Autoload de comandos con :quizID */

router.param('quizId', 		quizController.load);
router.param('commentId', 	commentController.load);

//Definición de rutas de sesión

router.get('/login',  sessionController.new);     //Formulario login
router.post('/login', sessionController.create);  //Crear sesión
router.get('/logout', sessionController.destroy); //Destruir sesión //DELETE

//Definición de rutas de /quizes
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new', 					sessionController.loginRequired,	quizController.new);
router.post('/quizes/create', 				sessionController.loginRequired,	quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    sessionController.loginRequired,	quizController.edit);
router.put('/quizes/:quizId(\\d+)',         sessionController.loginRequired,	quizController.update);
router.delete('/quizes/:quizId(\\d+)',      sessionController.loginRequired,	quizController.destroy);

//Definición de rutas de /comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 	 commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',  //PUT
			sessionController.loginRequired, 
			commentController.publish);

module.exports = router;
