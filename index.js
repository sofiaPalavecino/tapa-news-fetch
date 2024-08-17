import { initializeFirebaseApp, uploadProcessedData } from "./lib/firebase.js"
import Pagina12Standarizer from "./standarizers/pagina12Standarizer.js";
import ClarinStandarizer from "./standarizers/clarinStandarizer.js";
import LaNacionStandarizer from "./standarizers/laNacionStandarizer.js"
import InfobaeStandarizer from "./standarizers/infobaeStandarizer.js";
import AmbitoFinancieroStandarizer from "./standarizers/ambitoFinancieroStandarizer.js";
import PerfilStandarizer from "./standarizers/perfilStandarizer.js";
import LaPoliticaOnlineStandarizer from "./standarizers/laPoliticaOnlineStandarizer.js";
import LaIzquierdaDiarioStandarizer from "./standarizers/laIzquierdaDiarioStandarizer.js";
import ElDiarioARStandarizer from "./standarizers/elDiarioARStandarizer.js";
import ElPaisStandarizer from "./standarizers/elPaisStandarizer.js";

const standarizers = [
    Pagina12Standarizer,
    ClarinStandarizer,
    LaNacionStandarizer,
    InfobaeStandarizer,
    AmbitoFinancieroStandarizer,
    PerfilStandarizer,
    LaPoliticaOnlineStandarizer,
    LaIzquierdaDiarioStandarizer,
    ElDiarioARStandarizer,
    ElPaisStandarizer,
];

let data = []

async function getData(){
    standarizers.forEach(async element => {
        //const Standarizer = require(element);
        const e = new element();
        const info = await e.getNormalizedInfo()
        //data = [].concat(...await e.getNormalizedInfo());
        //console.log(data)

        console.log(info)
    });
}

async function testUpload(){
    await initializeFirebaseApp()
    await uploadProcessedData()
    console.log("funca");
}

getData()

//testUpload()
