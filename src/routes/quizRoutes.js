var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvar", function (req, res) {
    quizController.salvarResultado(req, res);
});

// Usuários/serviços externos (dashboard) devem buscar resultados via GET
router.get("/resultados", function (req, res) {
    quizController.buscarResultados(req, res);
});

// Buscar resultados de um usuário específico
router.get("/resultados/:id", function (req, res) {
    quizController.buscarResultadoUsuario(req, res);
});

router.get("/verificar/:id", function(req, res) {
    quizController.verificarSeJaFez(req, res);
});

router.delete("/deletar/:id", function(req, res) {
    quizController.deletarResultado(req, res);
});

module.exports = router;