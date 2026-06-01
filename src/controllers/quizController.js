var quizModel = require("../models/quizModel");

function salvarResultado(req, res) {
    var id_usuario = req.body.id_usuario;
    var guilda = req.body.guilda;
    var pontuacao_total = req.body.pontuacao_total;
    var pontos_por_questao = req.body.pontos_por_questao;

    if (id_usuario == undefined || guilda == undefined || pontuacao_total == undefined) {
        return res.status(400).json({ error: "Dados incompletos!" });
    }

    for(i = 0; i < pontos_por_questao.length; i++){
        quizModel.salvarResultado(id_usuario, guilda, pontuacao_total,pontos_por_questao[i])
        .then(function (resultado) {
            res.json({ success: true, insertId: resultado.insertId });
        })
        .catch(function (erro) {
            console.log("Erro ao salvar resultado:", erro);
            res.status(500).json({ error: erro.sqlMessage || erro.message || "Erro interno ao salvar resultado" });
        });
    }

    
}

function buscarResultados(req, res) {
    quizModel.buscarResultados()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ error: erro.sqlMessage || erro.message || "Erro interno ao buscar resultados" });
        });
}

function buscarResultadoUsuario(req, res) {
    var id_usuario = req.params.id;

    if (id_usuario == undefined) {
        return res.status(400).json({ error: "ID do usuário não informado." });
    }

    quizModel.buscarResultadoUsuario(id_usuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ error: erro.sqlMessage || erro.message || "Erro interno ao buscar resultado do usuário" });
        });
}

function verificarSeJaFez(req, res) {
    var id_usuario = req.params.id;
    
    quizModel.verificarSeJaFez(id_usuario)
        .then(function(resultado) {
            res.json({ jaFez: resultado.length > 0 });
        })
        .catch(function(erro) {
            res.status(500).json({ error: erro.sqlMessage || erro.message });
        });
}

function deletarResultado(req, res) {
    var id_usuario = req.params.id;
    
    quizModel.deletarResultado(id_usuario)
        .then(function(resultado) {
            res.json({ sucesso: true });
        })
        .catch(function(erro) {
            res.status(500).json({ error: erro.sqlMessage || erro.message });
        });
}

module.exports = {
    salvarResultado,
    buscarResultados,
    buscarResultadoUsuario,
    verificarSeJaFez,
    deletarResultado
};