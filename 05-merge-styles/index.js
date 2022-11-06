const fs = require('fs');
const path = require('path');

fs.appendFile(path.resolve(__dirname, 'project-dist\\bundle.css'), '', fillFile);
const writer = fs.createWriteStream(path.resolve(__dirname, 'project-dist\\bundle.css'))

function fillFile() {
  const folderStyles = path.resolve(__dirname, 'styles')
  fs.readdir(folderStyles, (err, data) => {
    data.filter(file => path.extname(`${folderStyles}\\${file}`) === '.css').forEach(file => {
      const reader = fs.createReadStream(`${folderStyles}\\${file}`, {encoding: 'utf-8'})
      reader.on('data', (dataRead) => {
        writer.write(dataRead)
      })
    })
  })
}