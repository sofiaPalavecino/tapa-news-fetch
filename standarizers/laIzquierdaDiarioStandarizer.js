import Standarizer from "../standarizer.js";

class LaIzquierdaDiarioStandarizer extends Standarizer{
    constructor(){
        const pageName = "laizquierdadiario"
        super(pageName)
    }

    getSubtitle(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0].replace(/<\/?ul>|<\/?li>|<\/?i>/g, '');
            let subtitleSentences = subtitle.match(/<p>(.*?)\b(?:\.|\!|\?)/)
            newItem['subtitle'] = subtitleSentences == null ? subtitle.trim() : subtitleSentences[1].trim()
        }
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]
            const startIndex = image.indexOf("https://www.laizquierdadiario.com/local/");
            const endIndex = image.indexOf("'", startIndex);
            if(startIndex != -1 && endIndex != -1){
                newItem['image'] = image.substring(startIndex, endIndex);
            }
        }
    }

    processCustomStandarization(item, newItem){
        this.getSubtitle(item, newItem);
        this.getImage(item, newItem);
    }
}

export default LaIzquierdaDiarioStandarizer;