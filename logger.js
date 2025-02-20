const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'logs', 'app.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    
    // Criar diretório se não existir
    if (!fs.existsSync(path.dirname(logFile))) {
        fs.mkdirSync(path.dirname(logFile));
    }
    
    fs.appendFileSync(logFile, logEntry, { flag: 'a' });
}

module.exports = log;