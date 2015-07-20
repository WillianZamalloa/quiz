var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next( new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error) { next(error); });
};

//GEt /quizes
exports.index = function(req, res){
	//models.Quiz.findAll({where:["question LIKE ?", search], order:"question"}).then(.....)
	if (req.query.search) {
		models.Quiz.findAll({where:{ pregunta : {$like : '%'+req.query.search+'%'}}, order:"pregunta"}).then(
			function(quizes){
				res.render('quizes/index.ejs', {quizes: quizes});
		}).catch(function(error) { next(error); });
	} else {
		models.Quiz.findAll().then(
			function(quizes){
				res.render('quizes/index.ejs', {quizes: quizes});
		}).catch(function(error) { next(error); });
	}
};

//GET /quizes/question
//exports.question = function(req, res){
//models.Quiz.findAll().success(function(quiz){

//GET /quizes/:id
exports.show = function(req, res){
    //models.Quiz.findAll().then(function(quiz){
    //res.render('quizes/show', {pregunta: quiz[0].pregunta});
    /*models.Quiz.findById(req.params.quizId).then(function(quiz){
    res.render('quizes/show', {quiz: quiz});
		})*/
		res.render('quizes/show', {quiz: req.quiz });

};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  //models.Quiz.findAll().success(function(quiz){
  //models.Quiz.findAll().then(function(quiz){
  /*models.Quiz.findById(req.params.quizId).then(function(quiz){
    if (req.query.respuesta == quiz.respuesta) {
      res.render('quizes/answer',
                  { quiz: quiz, respuesta: 'Correcto'});
    } else {
      res.render('quizes/answer',
                  { quiz: quiz, respuesta: 'InCorrecto'});
    }
  })*/
	var resultado = 'Incorrecto';
	if (req.query.respuesta == req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer',	{ quiz: req.quiz, respuesta: resultado});
};
