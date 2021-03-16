const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = './src/task1/csv/nodejs-hw1-ex1.csv';
const txtFilePath1 = './src/task1/csv/result1.txt';
const txtFilePath2 = './src/task1/csv/result2.txt';


function clearFile(path) {
  fs.writeFile(path, '', (error) => {
    if (error) {
      console.error('error during file cleanup');
    }
  });
}

function copyAllFile(from, to) {
  csv()
    .fromFile(from)
    .then((data) => {
      if (data) {
        clearFile(to);
        data.forEach((item) => {
          fs.appendFile(to, `${JSON.stringify(item)}\n`, (error) => {
            if (error) {
              console.error(error);
            }
          });
        });
      }
    });
}

function copyInParts(from, to) {
  const readStream = fs.createReadStream(from);
  const writeStream = fs.createWriteStream(to);
  readStream.pipe(csv()).pipe(writeStream);
}


copyAllFile(csvFilePath, txtFilePath1);
copyInParts(csvFilePath, txtFilePath2);
