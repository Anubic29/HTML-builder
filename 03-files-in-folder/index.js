const fs = require('fs');
const path = require('path');

const startFolder = 'secret-folder'

function startSearch(folder) {
  fs.readdir(path.resolve(__dirname, folder), (err, data) => {
    search(err, data, folder)
  })
}

function search(err, data, folder) {
  data.forEach(file => {
    fs.stat(path.resolve(__dirname, `${folder}\\${file}`), (err, stat) => {
      if (stat.isFile()) {
        const extension = path.extname(`${folder}\\${file}`);
        const fileName = path.basename(`${folder}\\${file}`, extension);
        console.log(`${fileName} - ${extension.substring(1)} - ${stat.size}b`);
      }
    })
  });
}

startSearch(startFolder)