const getXMLObject = require('./xmlProcessor.js');
const pagesData = require(`${__dirname}/sitesData.json`);

class Standarizer {
    constructor(pageName) {
      this.structure = {
        "title": "title",
        "link": "link",
        "date": "pubDate"
      };
      const pageInfo = pagesData[pageName]
      this.structure = Object.assign({}, this.structure, pageInfo.structure);
      this.pageUrls = pageInfo.urls;
      this.months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    }

    async getNormalizedInfo(){
      let normalizedItems = [];
      try{
        let pageItems = await this.getPagesItems();
        pageItems = this.preProcessItems(pageItems)
        for (const item of pageItems){
          let newItem = {};
          this.setItemBasicInfo(item, newItem)
          this.processCustomStandarization(item, newItem)
          normalizedItems.push(newItem);
        }
      } catch(error){
        console.log(error)
      }
      return normalizedItems;
    }

    preProcessItems(pageItems){ return pageItems }

    processCustomStandarization(item, newItem){}

    setItemBasicInfo(item, newItem){
      newItem['title'] = item[this.structure['title']][0].trim();
      newItem['link'] = item[this.structure['link']][0];
      newItem['date'] = item[this.structure['date']][0];
      this.formatDate(newItem)
    }

    formatDate(newItem){
      let date = new Date(newItem['date']);
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let formattedTime = date.getHours() + ':' + minutes;
      newItem['date'] = date.getDate() + ' de ' + this.months[date.getMonth()] + ' de ' + date.getFullYear() + ' ' + formattedTime
    }

    getFirstSentenceArray(sentence){
      return sentence.match(/^.*?[\.!?](?:\s|$)/);
    }

    async fetchPageData(xmlURL){
      try {
        const page = await getXMLObject(xmlURL);
        return await page;
      } catch (error) {
        console.error("Error getting page content:", error);
      }
    }
  
    async getPageData() {
      const results = [];
      for (const xmlUrl of this.pageUrls){
        console.log("fetching " + xmlUrl)
        const result = await this.fetchPageData(xmlUrl);
        results.push(result.rss.channel[0].item);
      }
      return await results;
    }

    async getPagesItems() {
      const results = await this.getPageData()
      const items = [].concat(...results);
      return await items;
    }
  }
  
module.exports = Standarizer;