const Standarizer = require("../standarizer");

class Pagina12Standarizer extends Standarizer{
    constructor(){
        const pageName = "pagina12";
        super(pageName);
    }

    getSubtitle(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0].substring(3);
            newItem['subtitle'] = subtitle;
        }
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]['$']['url'];
            newItem['image'] = image;
        }
    }

    async getNormalizedInfo(){
        const pageItems = await this.getPagesItems();
        let normalizedItems = [];
        for (const item of pageItems){
            let newItem = {};
            this.setItemBasicInfo(item, newItem)
            this.getSubtitle(item, newItem);
            this.getImage(item, newItem);
            this.formatDate(newItem)
            normalizedItems.push(newItem);
        }
        console.log(normalizedItems)
        return normalizedItems;
    }
}

module.exports = Pagina12Standarizer;