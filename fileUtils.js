const fs = require('fs');
const path = require('path');

const readJsonFile = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) return null;
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler ${path.basename(filePath)}:`, error.message);
        return null;
    }
};

const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Erro ao escrever ${path.basename(filePath)}:`, error.message);
    }
};

module.exports = { readJsonFile, writeJsonFile };