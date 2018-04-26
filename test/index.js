const fs = require('fs');
const path = require('path');

const requireFiles = function (directory) {
    fs.readdirSync(directory).forEach(function (fileName) {
        if (fs.lstatSync(directory + '/' + fileName).isDirectory()) {
            requireFiles(directory + '/' + fileName);
        } else {
            if (fileName === 'index.js') return;

            require(directory + '/' + fileName);
        }
    });
};

describe('Preparing Test', function () {
    this.timeout(2 * 60000);

    before(function (done) {
        require('../app');
        setTimeout(done, 2000);
        
    });
    
    requireFiles(__dirname);
});
