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

getData();

async function getData(){
    //var data = [];
    standarizers.forEach(async element => {
        const e = new element();
        let info =  await e.getNormalizedInfo()
        //testUpload(info)
        //data = [].concat(...await e.getNormalizedInfo());
    });
}

async function testUpload(info){
    await initializeFirebaseApp()
    for (let i = 0; i < 50; i++) {
        const element = info[i]; 
        await uploadProcessedData(element)
    }
}
