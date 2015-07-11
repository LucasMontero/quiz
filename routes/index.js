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

/*Get quizes page . */
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);


module.exports = router;
