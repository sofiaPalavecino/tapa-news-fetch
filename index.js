//import { initializeFirebaseApp, uploadProcessedData } from "./lib/firebase.js"

const standarizers = [
    `./standarizers/pagina12Standarizer.js`,
    `./standarizers/clarinStandarizer.js`,
    `./standarizers/laNacionStandarizer.js`,
    `./standarizers/infobaeStandarizer.js`,
    `./standarizers/ambitoFinancieroStandarizer.js`,
    `./standarizers/perfilStandarizer.js`,
    `./standarizers/laPoliticaOnlineStandarizer.js`,
    `./standarizers/laIzquierdaDiarioStandarizer.js`,
    `./standarizers/elDiarioARStandarizer.js`,
    `./standarizers/elPaisStandarizer.js`,
];
let data = []

async function getData(){
    standarizers.forEach(async element => {
        const Standarizer = require(element);
        const e = new Standarizer();
        //e.getNormalizedInfo()
        data = [].concat(...await e.getNormalizedInfo());
        console.log(data)
    });
}

async function testUpload(){
    initializeFirebaseApp()
    await uploadProcessedData()
}

getData()

//testUpload()
