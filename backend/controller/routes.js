const fs = require('fs');

const getRouteNames = () => {
    const namesArray = [];
    const files = fs.readdirSync(__dirname);

    files.forEach(file => {
        const name = file.split('.js')[0]
        if (!name.includes('.map') && !name.includes('routes') && name !== 'classes') {
            namesArray.push(name);
        }
    });
    return [...new Set(namesArray)];
}

const routeNames = getRouteNames();
module.exports = routeNames;