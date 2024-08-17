import Standarizer from "../standarizer.js";

class PerfilStandarizer extends Standarizer{
    constructor(){
        const pageName = "perfil"
        super(pageName)
    }

    getSubtitle(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0];
            subtitle = subtitle.replace(/<[^>]*>/g, '').replace(/Leer más/g, '');
            let sentences = this.getFirstSentenceArray(subtitle)
            newItem['subtitle'] = sentences == null ? subtitle.trim() : sentences[0].trim()
        }
    }
    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]['$']['url'];
            newItem['image'] = image;
        }
    }

    processCustomStandarization(item, newItem){
        this.getSubtitle(item, newItem);
        this.getImage(item, newItem);
    }
}

export default PerfilStandarizer;