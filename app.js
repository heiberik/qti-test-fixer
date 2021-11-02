import fs from "fs"
import path from "path"
import extract from 'extract-zip'
import zipdir from 'zip-dir'


const zipFiles = (name) => {

    zipdir(path.resolve("./" + name), { saveTo: './results/' + name + '.zip' }, function(err, buffer) {
        fs.rmdirSync("./" + name, { recursive: true })
    })
}


const fixFiles = (name) => {

    fs.readdir("./" + name + "/items/", function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {

            fs.readFile("./" + name + "/items/" + filename + "/qti.xml", 'utf-8', function(err, content) {
                if (err) {
                    onError(err);
                    return;
                }

                var result = content.replace(/<div class="grid-row">/g, '<div class="grid-row" translate="no">');

                fs.writeFile("./" + name + "/items/" + filename + "/qti.xml", result, 'utf8', function(err) {
                    if (err) return console.log(err);
                });
            });
        });
    });
}



const fixTests = () => {

    const paths = getAllTestPaths();


    paths.forEach(async(p, index) => {

        const name = p.substring(0, p.length - 4) + "_" + (index + 1)

        fs.mkdirSync("./" + name);

        const source = path.resolve("./tests/" + p)
        const target = path.resolve("./" + name)

        try {
            await extract(source, { dir: target })
            fixFiles(name)
        } catch (err) {
            console.log("ERROR D:");
        }

        setTimeout(() => {
            zipFiles(name)
        }, 5000)
    })
}

const getAllTestPaths = () => {

    const testFolder = './tests/'
    const tests = fs.readdirSync(testFolder)
    return tests
}

fixTests()