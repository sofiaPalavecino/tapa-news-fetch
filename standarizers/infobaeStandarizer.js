const Standarizer = require("../standarizer");

class InfobaeStandarizer extends Standarizer{
    constructor(){
        const pageName = "infobae";
        super(pageName);
    }

    preProcessItems(pageItems){
        pageItems = pageItems.filter((item) => this.filterByTopic(item)) //this format allows me to call this attributes inside of filter function
        return pageItems
    }

    filterByTopic(item){
        let validTopics = ["politica", "economia", "sociedad", "judiciales"]
        let link = item[this.structure['link']][0];
        let topic = link.replace('https://www.infobae.com/','').split('/')[0]
        return validTopics.includes(topic)
    }

    getSubtitle(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0];
            let sentences = this.getFirstSentenceArray(subtitle);
            newItem['subtitle'] = sentences == null ? subtitle : sentences[0]
        }
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]
            const startIndex = image.indexOf("https://www.infobae.com/new-resizer/");
            const endIndex = image.indexOf('"', startIndex);
            image = image.substring(startIndex, endIndex);
            newItem['image'] = image;
        }
    }

    processCustomStandarization(item, newItem){
        this.getSubtitle(item, newItem);
        this.getImage(item, newItem);
    }
}

module.exports = InfobaeStandarizer;