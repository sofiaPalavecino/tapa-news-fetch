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
    }

    setItemBasicInfo(item, newItem){
      newItem['title'] = item[this.structure['title']][0];
      newItem['link'] = item[this.structure['link']][0];
      newItem['date'] = item[this.structure['date']][0];
      return newItem;
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