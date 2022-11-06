const process = require('process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

fs.appendFile(path.resolve(__dirname, 'text.txt'), '', function (err) {
  if (err) throw err;
});

const writer = fs.createWriteStream(path.resolve(__dirname, 'text.txt'))

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.setPrompt('Hello there! Enter some string to file!\n');
rl.prompt()

rl.on('line', (data) => {
  if(data === 'exit') process.exit()
  writer.write(`${data}\n`)
});

process.on('exit', () => {
  rl.close()
  console.log(`\nGood bye!`);
});