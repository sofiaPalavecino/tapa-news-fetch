const Standarizer = require("../standarizer");

class Pagina12Standarizer extends Standarizer{
    constructor(){
        const pageName = "pagina12";
        super(pageName);
    }

    formatDate(newItem){
        var date = new Date(newItem['date']);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var formattedTime = hours + ':' + minutes;
        newItem['date'] = day + ' de ' + this.months[month] + ' de ' + year + ' ' + formattedTime
        return newItem;
    }

    getSubtitle(item, newItem){
        if (item.hasOwnProperty(this.structure['subtitle'])){
            let subtitle = item[this.structure['subtitle']][0].substring(3);
            newItem['subtitle'] = subtitle;
        }
        return newItem;
    }

    getImage(item, newItem){
        if (item.hasOwnProperty(this.structure['image'])) {
            let image = item[this.structure['image']][0]['$']['url'];
            newItem['image'] = image;
        }
        return newItem;
    }

    async getNormalizedInfo(){
        const pageItems = await this.getPagesItems();
        let normalizedItems = [];
        for (const item of pageItems){
            let newItem = {};
            newItem = this.setItemBasicInfo(item, newItem)
            newItem = this.getSubtitle(item, newItem);
            newItem = this.getImage(item, newItem);
            newItem = this.formatDate(newItem)
            normalizedItems.push(newItem);
        }
        console.log(normalizedItems)
        return normalizedItems;
    }
}

module.exports = Pagina12Standarizer;