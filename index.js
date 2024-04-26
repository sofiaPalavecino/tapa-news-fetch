const pagesData = require(`${__dirname}/sitesData.json`);

const standarizers = [
    `${__dirname}/standarizers/pagina12Standarizer.js`,
    //`${__dirname}/standarizers/clarinStandarizer.js`
];
let data = []

async function getData(){
    standarizers.forEach(async element => {
        const Standarizer = require(element);
        const e = new Standarizer();
        e.getNormalizedInfo()
        //data = [].concat(...await e.getNormalizedInfo());
        //console.log(data)
    });
}

getData()
