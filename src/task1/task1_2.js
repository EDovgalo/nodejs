import {
    createReadStream, createWriteStream, writeFile, appendFile
} from 'fs';

import csv from 'csvtojson';

const csvFilePath = './src/task1/csv/nodejs-hw1-ex1.csv';
const txtFilePath1 = './src/task1/csv/result1.txt';
const txtFilePath2 = './src/task1/csv/result2.txt';
const csvConfig = {
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
    colParser: {
        price: 'number'
    },
    ignoreColumns: /amount/
};

function clearFile(path) {
    writeFile(path, '', (error) => {
        if (error) {
            console.error('error during file cleanup');
        }
    });
}

function copyAllFile(from, to) {
    csv(csvConfig)
        .fromFile(from)
        .then((data) => {
            if (data) {
                clearFile(to);
                data.forEach((item) => {
                    appendFile(to, `${JSON.stringify(item)}\n`, (error) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                });
            }
        });
}

function copyInParts(from, to) {
    const readStream = createReadStream(from);
    const writeStream = createWriteStream(to);
    readStream.pipe(csv(csvConfig))
        .on('error', (error) => console.error(error))
        .pipe(writeStream)
        .on('error', (error) => console.error(error));
}


copyAllFile(csvFilePath, txtFilePath1);
copyInParts(csvFilePath, txtFilePath2);
