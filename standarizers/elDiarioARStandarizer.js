import Standarizer from "../standarizer.js";

class ElDiarioARStandarizer extends Standarizer{
    constructor(){
        const pageName = "eldiarioar"
        super(pageName)
    }

    preProcessItems(pageItems){
        pageItems = pageItems.filter((item) => this.filterByTopic(item))
        return pageItems
    }

    filterByTopic(item){
        let validTopics = ["politica", "economia", "sociedad", "blog", "opinion", "latinoamerica"]
        let link = item[this.structure['link']][0];
        let topic = link.replace('https://www.eldiarioar.com/','').split('/')[0]
        return validTopics.includes(topic)
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]['$']['url'];
            newItem['image'] = image;
        }
    }

    processCustomStandarization(item, newItem){
        this.getImage(item, newItem);
    }

}

export default ElDiarioARStandarizer;