import fs from 'fs';

function getTokenFromFile(filePath) {
    try {
        const token = fs.readFileSync(filePath, 'utf8').trim();
        return token;
    } catch (error) {
        console.error(`Error reading token from file '${filePath}':`, error.message);
        return null;
    }
}

export default getTokenFromFile;
