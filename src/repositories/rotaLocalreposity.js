const sequelize = require("../configs/sequelize")
const rotaLocais = require("../models/modelRotas_Locais")

class rotaLocalQueries {

    constructor() { }

    async changeOrder(ordemAnterior, ordemAtual, idRota) {
        for (let i = 0; i <= ordemAtual.length - 1; i++) {
            // console.log(ordemAnterior[i], ordemAtual[i])
            try {
                let idAntigo = ordemAnterior[i];
                let idAtual = ordemAtual[i];
                let idMax = (await sequelize.sequelize.query(`SELECT MAX(id) + 1 as id from tijucaronda2.rotas_locais;`, {
                    type: sequelize.Sequelize.QueryTypes.SELECT
                }))[0].id
                let tmpid = 999999 + Math.floor(Math.random() * 1000)
                let horario1 = (await rotaLocais.findOne({ where: { id: idAntigo } })).horario;
                let horario2 = (await rotaLocais.findOne({ where: { id: idAtual } })).horario;

                await sequelize.sequelize.transaction(async (t) => {

                    await sequelize.sequelize.query(`
                        update tijucaronda2.rotas_locais set id=:tmpid where id = :idAtual AND idRota = :idRota;`,
                        {
                            replacements: {
                                tmpid,
                                idAntigo,
                                idAtual,
                                idRota,
                            },
                            transaction: t
                        }
                    )
                    await sequelize.sequelize.query(`
                        update tijucaronda2.rotas_locais set horario=:horario1 where id = :tmpid;`,
                        {
                            replacements: { horario1, tmpid },
                            transaction: t
                        }

                    )
                    await sequelize.sequelize.query(`
                        update tijucaronda2.rotas_locais set id=:idAtual where id = :idAntigo AND idRota = :idRota;`,
                        {
                            replacements: {
                                tmpid: tmpid,
                                idAntigo: idAntigo,
                                idAtual: idAtual,
                                idRota: idRota
                            },
                            transaction: t
                        }
                    )
                    await sequelize.sequelize.query(`
                        update tijucaronda2.rotas_locais set horario=:horario2 where id = :idAtual;`,
                        {
                            replacements: { horario2, idAtual },
                            transaction: t
                        }


                    )
                    await sequelize.sequelize.query(`
                        update tijucaronda2.rotas_locais set id=:idAntigo where id = :tmpid AND idRota = :idRota;`,
                        {
                            replacements: {
                                tmpid: tmpid,
                                idAntigo: idAntigo,
                                idAtual: idAtual,
                                idRota: idRota
                            },
                            transaction: t
                        }
                    )

                    await sequelize.sequelize.query(`
                        ALTER TABLE tijucaronda2.rotas_locais 
                        AUTO_INCREMENT = :idMax
                    `, {
                        replacements: { idMax },
                        transaction: t
                    }
                    );
                }
                )

            }
            catch (e) {
                console.log(e)
                return false
            }
        }
        return true
    }
}

module.exports = rotaLocalQueries;