const setorReposity = require("../repositories/setorReposity")




class setorService {



    constructor(){




    }


    createService = async (nomeSetor) => {
        const reposity = new setorReposity()
        let result = await reposity.insertNewSetor(nomeSetor)
        
        







    }
    



    






























    
}

module.exports = setorService