import { AstraDB } from "@datastax/astra-db-ts";
import getTokenFromFile from './getAstaAPIToken.js';

async function main() {
    const token = getTokenFromFile();
    const astaUrl = "https://9b3690b6-f229-4ee7-b679-b5795df78bb1-us-east-2.apps.astra.datastax.com"
    const astraDb = new AstraDB(token, astaUrl)
}
main().catch(console.error); 