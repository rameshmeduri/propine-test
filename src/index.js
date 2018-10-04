const path = require('path');
const fs = require('fs');
const nlp = require('compromise');
var csv = require('fast-csv');

let inputCsvFile = path.resolve(__dirname, 'in.csv');
let outputCsvFile = path.resolve(__dirname, 'out.csv');
let outArr = [];

readCsv(inputCsvFile);

function readCsv() {
    csv
        .fromPath(inputCsvFile, { headers: true })
        .on('data', function (row) {
            // console.log(row);
            let line = row.headline_text;
            outArr.push(processLine(line));
        })
        .on('end', function () {
            console.log('Read Done!');
            writeCsv();
        });
}

function writeCsv() {
    csv
        .writeToPath(outputCsvFile, outArr, { headers: false })
        .on('finish', function () {
            console.log('Write Done!');
        });
}

function processLine(str) {
    let sentence = capitalizeFirstLetter(str);
    let doc = nlp(sentence);
    let placeStr = doc.places().out('text');
    let placeArr = placeStr.split(' ');

    placeArr.forEach((item) => {
        let c = capitalizeFirstLetter(item);
        let rx = new RegExp(item, 'g');
        sentence = sentence.replace(rx, c);
    });

    return [sentence];
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}