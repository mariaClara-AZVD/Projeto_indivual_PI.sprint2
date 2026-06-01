var database = require("../database/config")

function salvarResultado(id_usuario, guilda, pontuacao_total, pontos_por_questao) {
    console.log("Salvando resultado do quiz:", id_usuario, guilda, pontuacao_total, pontos_por_questao);
    
    var instrucaoSql = `
        INSERT INTO quiz (id_usuario, guilda, pontuacao_total, pontos_por_questao)
        VALUES (${id_usuario}, '${guilda}', ${pontuacao_total}, '${pontos_por_questao}');
    `;
    
    return database.executar(instrucaoSql);
}

function buscarResultados() {

    var instrucaoSql = `
        SELECT guilda, COUNT(*) as total
        FROM quiz
        GROUP BY guilda;
    `;
    return database.executar(instrucaoSql);
}

function buscarResultadoUsuario(id_usuario) {
    var instrucaoSql = `
        SELECT guilda, pontuacao_total
        FROM quiz
        WHERE id_usuario = ?;
    `;
    return database.executarComParametros(instrucaoSql, [id_usuario]);
}

function verificarSeJaFez(id_usuario) {
    var instrucaoSql = `
        SELECT * FROM quiz WHERE id_usuario = ${id_usuario};
    `;
    return database.executar(instrucaoSql);
}

function deletarResultado(id_usuario) {
    var instrucaoSql = `
        DELETE FROM quiz WHERE id_usuario = ${id_usuario};
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    salvarResultado,
    buscarResultados,
    buscarResultadoUsuario,
    verificarSeJaFez,
    deletarResultado
};