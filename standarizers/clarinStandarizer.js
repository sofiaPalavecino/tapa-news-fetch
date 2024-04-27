const Standarizer = require("../standarizer");

class ClarinStandarizer extends Standarizer{
    constructor(){
        const pageName = "clarin";
        super(pageName);
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]['$']['url']
            newItem['image'] = image;
        }
        return newItem;
    }

    getDescription(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0].replace(/<\/?p>|<\/?ul>|<\/?li>/g, '');
            subtitle = subtitle.match(/^([^\.!?]+[\.!?])/)[0].replace(/^\s+/, '');
            newItem['subtitle'] = subtitle;
        }
        return newItem;
    }

    async getNormalizedInfo(){
        const pageItems = await this.getPagesItems();
        let normalizedItems = [];
        for (const item of pageItems){
            let newItem = {};
            newItem = this.setItemBasicInfo(item, newItem)
            newItem = this.getDescription(item, newItem)
            newItem = this.getImage(item, newItem)
            newItem = this.formatDate(newItem)
            normalizedItems.push(newItem); 
        }
        console.log(normalizedItems);
    }
}

module.exports = ClarinStandarizer;