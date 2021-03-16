const readline = require('readline');
const util = require('util');

const rl = readline.createInterface({
  input: process.stdin
});

const question = util.promisify(rl.question).bind(rl);

async function run() {
  while (true) {
    const answer = await question('');
    const result = answer && answer.split('').reverse().join('');
    console.log(result);
  }
}

run();
