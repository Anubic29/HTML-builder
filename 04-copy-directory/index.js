const fs = require('fs');
const path = require('path');

fs.rm(path.resolve(__dirname, 'files-copy'), { recursive: true }, generateFolder)

function generateFolder() {
  fs.mkdir(path.resolve(__dirname, 'files-copy'), fillFolder)
}

function fillFolder() {
  fs.readdir(path.resolve(__dirname, 'files'), (err, data) => {
    data.forEach(file => {
      fs.copyFile(path.resolve(__dirname, `files\\${file}`), path.resolve(__dirname, `files-copy\\${file}`), () => {})
    })
  })
}