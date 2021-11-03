import fs from "fs"
import path from "path"
import extract from 'extract-zip'
import zipdir from 'zip-dir'
import config from './config.js'


const zipFiles = (name) => {

    zipdir(path.resolve("./" + name), { saveTo: './results/' + name + '.zip' }, function(err, buffer) {
        fs.rmSync("./" + name, { recursive: true })
    })
}


const fixFiles = (name) => {

    let itemFolders = fs.readdirSync("./" + name + "/items/")

    itemFolders.forEach(function(filename) {

        let content = fs.readFileSync("./" + name + "/items/" + filename + "/qti.xml", 'utf-8')
        let regex = new RegExp(config.replace, 'g');
        let result = content.replace(regex, config.replaceWith)

        fs.writeFileSync("./" + name + "/items/" + filename + "/qti.xml", result, 'utf8')
    });

    zipFiles(name)
}



const fixTests = () => {

    const paths = getAllTestPaths();

    if (!fs.existsSync('./results')) {
        fs.mkdirSync("./results")
    }

    paths.forEach(async(p, index) => {

        const name = p.substring(0, p.length - 4)

        fs.mkdirSync("./" + name);

        const source = path.resolve("./tests/" + p)
        const target = path.resolve("./" + name)

        try {
            await extract(source, { dir: target })
            fixFiles(name)
        } catch (err) {
            console.log("ERROR D:");
        }
    })
}

const getAllTestPaths = () => {

    const testFolder = './tests/'
    const tests = fs.readdirSync(testFolder)
    return tests
}

fixTests()