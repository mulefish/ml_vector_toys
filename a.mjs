import { AstraDB } from "@datastax/astra-db-ts";

import getTokenFromFile from './tokenReader.js';

function main() {
    const filePath = '.mysecret.txt';
    const token = getTokenFromFile(filePath);
    if (token) {
        console.log('Token:', token);
    }
}
main()

  
// async function main() {
//   // Initialize the client
//   const astraDb = new AstraDB(
//   "YOUR_TOKEN", "https://9b3690b6-f229-4ee7-b679-b5795df78bb1-us-east-2.apps.astra.datastax.com")
// }
// main().catch(console.error);