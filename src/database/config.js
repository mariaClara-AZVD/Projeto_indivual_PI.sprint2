var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect(function (erroConexao) {
            if (erroConexao) {
                console.error("Erro na conexão com MySQL:", erroConexao.sqlMessage || erroConexao.message);
                reject(erroConexao);
                return;
            }

            // Ativar autocommit para garantir que os dados sejam salvos
            conexao.query('SET autocommit=1', function(erroAuto) {
                if(erroAuto) {
                    console.error("Erro ao ativar autocommit:", erroAuto.message);
                    reject(erroAuto);
                    return;
                }

                conexao.query(instrucao, function (erro, resultados) {
                    conexao.end();
                    if (erro) {
                        reject(erro);
                        return;
                    }
                    console.log(resultados);
                    resolve(resultados);
                });
            });
        });

        conexao.on('error', function (erro) {
            console.error("ERRO NO MySQL SERVER:", erro.sqlMessage || erro.message);
            reject(erro);
        });
    });
}

function executarComParametros(instrucao, parametros) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect(function (erroConexao) {
            if (erroConexao) {
                console.error("Erro na conexão com MySQL:", erroConexao.sqlMessage || erroConexao.message);
                reject(erroConexao);
                return;
            }

            // Ativar autocommit para garantir que os dados sejam salvos
            conexao.query('SET autocommit=1', function(erroAuto) {
                if(erroAuto) {
                    console.error("Erro ao ativar autocommit:", erroAuto.message);
                    reject(erroAuto);
                    return;
                }

                conexao.query(instrucao, parametros, function (erro, resultados) {
                    conexao.end();
                    if (erro) {
                        reject(erro);
                        return;
                    }
                    console.log(resultados);
                    resolve(resultados);
                });
            });
        });

        conexao.on('error', function (erro) {
            console.error("ERRO NO MySQL SERVER:", erro.sqlMessage || erro.message);
            reject(erro);
        });
    });
}

module.exports = {
    executar,
    executarComParametros
};