import fetch from 'node-fetch';
import { parseString } from 'xml2js';

// Function to fetch XML data from a URL
async function fetchXML(url) {
    const response = await fetch(url);
    return response.text();
}

async function getXMLObject(xmlURL) {
    try {
        const xmlData = await fetchXML(xmlURL);
        return new Promise((resolve, reject) => {
            parseString(xmlData, (err, result) => {
                if (err) {
                    console.error("Error parsing XML:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    } catch (error) {
        console.error("Error fetching XML:", error);
        throw error;
    }

}

export default getXMLObject;