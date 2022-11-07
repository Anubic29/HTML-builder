const fs = require('fs');
const path = require('path');

const mainFolderName = 'project-dist'

fs.rm(path.resolve(__dirname, mainFolderName), { recursive: true }, generateFolder)

function generateFolder() {
  fs.mkdir(path.resolve(__dirname, mainFolderName), fillMainFolder)
}

function fillMainFolder() {
  fillHtml()
  fillStyle()
  fillAssets('assets')
}

async function fillHtml() {
  await fs.promises.appendFile(path.resolve(__dirname, `${mainFolderName}\\index.html`), '')
  let mainHtml = await fs.promises.readFile(path.resolve(__dirname, 'template.html'), {encoding: 'utf-8'})
  const components = mainHtml.match(/{{\w+}}/gi).map(name => {
    return name.replaceAll('{', '').replaceAll('}', '')
  })
  const obj = {}
  for (let idx = 0; idx < components.length; idx++) {
    obj[components[idx]] = await fs.promises.readFile(path.resolve(__dirname, `components\\${components[idx]}.html`), {encoding: 'utf-8'})
  }
  components.forEach(component => {
    mainHtml = mainHtml.replace(`{{${component}}}`, obj[component])
  })
  await fs.promises.writeFile(path.resolve(__dirname, `${mainFolderName}\\index.html`), mainHtml, err => {
    if(err) return console.error(err)
  })
}

async function fillStyle() {
  await fs.promises.appendFile(path.resolve(__dirname, `${mainFolderName}\\style.css`), '')
  const list = (await fs.promises.readdir(path.resolve(__dirname, 'styles'))).filter(file => path.extname(`${path.resolve(__dirname, 'styles')}\\${file}`) === '.css')
  let result = ''
  for (let idx = 0; idx < list.length; idx++) {
    result += await fs.promises.readFile(path.resolve(__dirname, `styles\\${list[idx]}`), {encoding: 'utf-8'})
    result += '\n'
  }
  await fs.promises.writeFile(path.resolve(__dirname, `${mainFolderName}\\style.css`), result, err => {
    if(err) return console.error(err)
  })
}

function fillAssets(nameFolder) {
  fs.mkdir(path.resolve(__dirname, `${mainFolderName}\\${nameFolder}`), () => {
    fillAssetsFolder(nameFolder)
  })
}

function fillAssetsFolder(nameFolder) {
  fs.readdir(path.resolve(__dirname, nameFolder), (err, data) => {
    data.forEach(file => {
      fs.stat(path.resolve(__dirname, `${nameFolder}\\${file}`), (err, stat) => {
        if (stat.isDirectory()) {
          fillAssets(`${nameFolder}\\${file}`)
        } else {
          fs.copyFile(path.resolve(__dirname, `${nameFolder}\\${file}`), path.resolve(__dirname, `${mainFolderName}\\${nameFolder}\\${file}`), () => {})
        }
      })
    })
  })
}