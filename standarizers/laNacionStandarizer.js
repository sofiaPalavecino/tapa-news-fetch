const Standarizer = require("../standarizer");

class LaNacionStandarizer extends Standarizer{
    constructor(){
        const pageName = "lanacion";
        super(pageName);
    }

    processCustomStandarization(item, newItem){
        
    }
}

module.exports = LaNacionStandarizer;