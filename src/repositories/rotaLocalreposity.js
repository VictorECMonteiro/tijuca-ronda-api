const sequelize = require("../configs/sequelize")
const rotaLocais = require("../models/modelRotas_Locais")

class rotaLocalQueries {

    constructor() { }

    async changeOrder(ordemAtual, ordemAnterior) {
        for (let i = 0; i <= ordemAtual; i++) {
            let updateQuery = sequelize.sequelize.query(`
                BEGIN;
                set @idanterior = :idAntigo;
                set @idatual = :idAtual;
                set @tmpid = 999999;
                update tijucaronda2.rotas_locais set id=@tmpid where id = @idanterior;
                update tijucaronda2.rotas_locais set id=@idanterior where id=@idatual;
                update tijucaronda2.rotas_locais set id=@idatual where id = @tmpid;
                COMMIT;`, {
                replacements: {
                    idAntigo: ordemAnterior[0],
                    idAtual: ordemAtual[0]
                }

            })
        }
        return true


    }





























}