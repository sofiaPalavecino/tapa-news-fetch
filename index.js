const standarizers = [
    //`${__dirname}/standarizers/pagina12Standarizer.js`,
    `${__dirname}/standarizers/clarinStandarizer.js`,
    //`${__dirname}/standarizers/laNacionStandarizer.js`
];
let data = []

async function getData(){
    standarizers.forEach(async element => {
        const Standarizer = require(element);
        const e = new Standarizer();
        const info = await e.getNormalizedInfo()
        //data = [].concat(...await e.getNormalizedInfo());
        //console.log(data)

        console.log(info)
    });
}

getData()
