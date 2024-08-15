import { initializeFirebaseApp, uploadProcessedData } from "./lib/firebase.js"

const standarizers = [
    //`${__dirname}/standarizers/pagina12Standarizer.js`,
    //`${__dirname}/standarizers/clarinStandarizer.js`,
    //`${__dirname}/standarizers/laNacionStandarizer.js`,
    //`${__dirname}/standarizers/infobaeStandarizer.js`,
    //`${__dirname}/standarizers/ambitoFinancieroStandarizer.js`,
    //`${__dirname}/standarizers/perfilStandarizer.js`,
    //`${__dirname}/standarizers/laPoliticaOnlineStandarizer.js`,
    //`${__dirname}/standarizers/laIzquierdaDiarioStandarizer.js`,
    //`${__dirname}/standarizers/elDiarioARStandarizer.js`,
    //`${__dirname}/standarizers/elPaisStandarizer.js`,
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

async function testUpload(){
    initializeFirebaseApp()
    await uploadProcessedData()
    console.log("funca");
}

//getData()

testUpload()
