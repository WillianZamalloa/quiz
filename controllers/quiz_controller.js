var models = require('../models/models.js');

//GEt /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};

//GET /quizes/question
//exports.question = function(req, res){
  //models.Quiz.findAll().success(function(quiz){
exports.show = function(req, res){
    //models.Quiz.findAll().then(function(quiz){
    //res.render('quizes/show', {pregunta: quiz[0].pregunta});
    models.Quiz.findById(req.params.quizId).then(function(quiz){
    res.render('quizes/show', {quiz: quiz});
  })

};

//GET /quizes/question
exports.answer = function(req, res){
  //models.Quiz.findAll().success(function(quiz){
  //models.Quiz.findAll().then(function(quiz){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
    if (req.query.respuesta == quiz.respuesta) {
      res.render('quizes/answer',
                  { quiz: quiz, respuesta: 'Correcto'});
    } else {
      res.render('quizes/answer',
                  { quiz: quiz, respuesta: 'InCorrecto'});
    }
  })
};
