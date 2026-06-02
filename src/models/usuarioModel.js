var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT 
            id_usuario,
            email,
            nome_usuario,
            senha
        FROM usuario
        WHERE email = ?
        AND senha = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("Valores: ", [email, senha]);
    return database.executarComParametros(instrucaoSql, [email, senha]);
}

// Coloca os mesmos parâmetros aqui!
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insere exatamente a query do banco aqui! lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados
    var instrucaoSql = `
        INSERT INTO usuario
        (nome_usuario, email, senha)
        VALUES
        (?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("Valores: ", [nome, email, senha]);
    return database.executarComParametros(instrucaoSql, [nome, email, senha]);
}

module.exports = {
    autenticar,
    cadastrar
};
