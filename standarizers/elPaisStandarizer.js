import Standarizer from "../standarizer.js";

class ElPaisStandarizer extends Standarizer{
    constructor(){
        const pageName = "elpais"
        super(pageName)
    }

    preProcessItems(pageItems){
        pageItems = pageItems.filter((item) => this.filterByTopic(item))
        return pageItems
    }

    filterByTopic(item){
        let validTopics = ["internacional", "america", "economia", "companias", "mercados-financieros"]
        let link = item[this.structure['link']][0];
        let topic = link.replace('https://elpais.com/','').split('/')[0]
        return validTopics.includes(topic)
    }

    getSubtitle(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0]['media:description'];
            if(subtitle){
                newItem['subtitle'] = subtitle[0];
            }
        }
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let mediaContent = item[this.structure['image']][0];
            let thumbnail = mediaContent['media:thumbnail']
            newItem['image'] = thumbnail ? thumbnail[0]['$']['url'] : mediaContent['$']['url'];
        }
    }

    processCustomStandarization(item, newItem){
        this.getSubtitle(item, newItem);
        this.getImage(item, newItem);
    }
}

export default ElPaisStandarizer