var express = require('express');
var router = express.Router();
var textTitle = "Quiz"

var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: textTitle });
});

/* GET Authors page. */
router.get('/Authors', function(req, res) {
  	res.render('authors', {title: textTitle});
});

/* Autoload de comandos con :quizID */

router.param('quizId', quizController.load);

/*Get quizes page . */
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new', 					quizController.new);
router.post('/quizes/create', 				quizController.create);


module.exports = router;
