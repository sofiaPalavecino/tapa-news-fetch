import Standarizer from "../standarizer.js";

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
    }

    getDescription(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0].replace(/<\/?p>|<\/?ul>|<\/?li>/g, '');
            let subtitleSentences = this.getFirstSentenceArray(subtitle)
            subtitle = subtitleSentences == null ? subtitle : subtitleSentences[0].replace(/^\s+/, '')
            newItem['subtitle'] = subtitle;
        }
    }

    processCustomStandarization(item, newItem){
        this.getDescription(item, newItem)
        this.getImage(item, newItem)
    }
}

export default ClarinStandarizer;