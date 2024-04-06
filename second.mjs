import { AstraDB } from "@datastax/astra-db-ts";
import getTokenFromFile from './getAstaAPIToken.js';

async function main() {

  // const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;
 
      const ASTRA_DB_APPLICATION_TOKEN = getTokenFromFile();
      const ASTRA_DB_API_ENDPOINT = "https://9b3690b6-f229-4ee7-b679-b5795df78bb1-us-east-2.apps.astra.datastax.com"
  
  // Initialize the client. The keyspace parameter is optional if you use
  // "default_keyspace".
  const db = new AstraDB(
      ASTRA_DB_APPLICATION_TOKEN,
      ASTRA_DB_API_ENDPOINT,
      "default_keyspace"
  );

  // Create a collection. The default similarity metric is "cosine".
  await db.createCollection(
    "vector_test",
    {
      "vector": {
        "dimension": 5,
        "metric": "cosine"
      }
    }
  );
  const collection = await db.collection("vector_test");
  console.log(collection);

  // Insert documents into the collection
  const documents = [
      {
          "_id": "1",
          "text": "ChatGPT integrated sneakers that talk to you",
          "$vector": [0.1, 0.15, 0.3, 0.12, 0.05],
      },
      {
          "_id": "2",
          "text": "An AI quilt to help you sleep forever",
          "$vector": [0.45, 0.09, 0.01, 0.2, 0.11],
      },
      {
          "_id": "3",
          "text": "A deep learning display that controls your mood",
          "$vector": [0.1, 0.05, 0.08, 0.3, 0.6],
      }
  ];
  const results = await collection.insertMany(documents);
  console.log(results);

  // Define the search options
  const options = {
      sort: {
          "$vector": [0.15, 0.1, 0.1, 0.35, 0.55],
      },
      limit: 5
  };

  // Perform a similarity search
  const docs = await collection.find({}, options).toArray();
  docs.forEach(doc => console.log(doc));

  // Delete the collection
  const response = await db.dropCollection("vector_test");
  console.log(response);

}

main().catch(console.error);