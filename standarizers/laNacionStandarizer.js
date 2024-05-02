const Standarizer = require("../standarizer");

class LaNacionStandarizer extends Standarizer{
    constructor(){
        const pageName = "lanacion";
        super(pageName);

    }

    preProcessItems(pageItems){
        pageItems = pageItems.filter((item) => this.filterByTopic(item)) //this format allows me to call this attributes inside of filter function
        return pageItems
    }

    filterByTopic(item){
        let validTopics = ["politica", "economia", "sociedad", "comunidad", "el-mundo"]
        let link = item[this.structure['link']][0];
        let topic = link.replace('https://www.lanacion.com.ar/','').split('/')[0]
        return validTopics.includes(topic)
    }

    getDescription(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])) {
            let subtitle = item[this.structure['subtitle']][0];
            newItem['subtitle'] = subtitle;
        }
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]['$']['url'];
            newItem['image'] = image;
        }
    }

    processCustomStandarization(item, newItem){
        this.getImage(item, newItem)
        this.getDescription(item, newItem)
    }
}

module.exports = LaNacionStandarizer;