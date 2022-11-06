const fs = require('fs');
const path = require('path');

const stream = new fs.createReadStream(path.resolve(__dirname,'text.txt'), {encoding: 'utf-8'});

stream.on('data', function (chunk) {
  console.log(chunk);
});