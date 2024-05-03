const Standarizer = require("../standarizer");

class AmbitoFinancieroStandarizer extends Standarizer{
    constructor(){
        const pageName = "ambitofinanciero"
        super(pageName)
    }

    getSubtitle(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0];
            newItem['subtitle'] = subtitle.replace(/<\/?p>/g, '');
        }
    }

    processCustomStandarization(item, newItem){
        this.getSubtitle(item, newItem);
    }
}

module.exports = AmbitoFinancieroStandarizer;