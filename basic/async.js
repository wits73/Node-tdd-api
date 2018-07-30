// https://goo.gl/7a9Tsz
const fs = require('fs')

const callback = (err, data) =>{
    console.log(data);
}

fs.readFile('test.txt', {
    encoding: 'utf8'
}, callback)

