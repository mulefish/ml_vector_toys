import { AstraDB } from "@datastax/astra-db-ts";
import getTokenFromFile from './getAstaAPIToken.js';

async function main() {
      const ASTRA_DB_APPLICATION_TOKEN = getTokenFromFile();
      const ASTRA_DB_API_ENDPOINT = "https://9b3690b6-f229-4ee7-b679-b5795df78bb1-us-east-2.apps.astra.datastax.com"
                                     
  const db = new AstraDB(
      ASTRA_DB_APPLICATION_TOKEN,
      ASTRA_DB_API_ENDPOINT,
      "default_keyspace"
  );

  await db.createCollection(
    "vector_test", {
      "vector": {
        "dimension": 5, // TODO: dimension = size of the array that the vectors will have? I think this is a hint to astra on how to organize things.
        // "metric": "cosine" // Slow but no need to normalize the vectors first
        "metric": "dot_product" // Quick but have to normalize the vectors first
        //"metric": "euclidean" // Good for Clustering
      }
    }
  );
  const collection = await db.collection("vector_test");
  // console.log(collection);

  // Insert documents into the collection
  const documents = [
      {
          "_id": "111",
          "text": "Hello my dear.",
          "$vector": [0.1, 0.15, 0.3, 0.12, 0.05],
      },
      {
          "_id": "211",
          "text": "If dinosaurs had a space program we would not be here.",
          "$vector": [0.45, 0.09, 0.01, 0.2, 0.11],
      },
      {
          "_id": "311",
          "text": "Reuben kicked his donkey.",
          "$vector": [0.1, 0.05, 0.08, 0.3, 0.6],
      }
  ];
  const results = await collection.insertMany(documents);
  console.log(results);
  const options = {
      sort: {
          "$vector": [0.15, 0.1, 0.1, 0.35, 0.55], 
          // Some vector to look for...  Well, sort on and get the closest results
          // Notice that this is NOT a perfect match!
          // Sloppy logic is the best logic. 

      },
      limit: 2
  };

  // Perform a similarity search!
  const docs = await collection.find({}, options).toArray();
  // docs.forEach(doc => console.log(doc));
  docs.forEach((doc, i)=> { 
    console.log( `i=${i} id=${doc._id} vector=${doc["$vector"]} text=${doc.text} `)
  })

  // Clean up! Delete the collection
  const response = await db.dropCollection("vector_test");
  const isOk = response["errors"] === undefined && response["status"]["ok"] === 1 ? "PASS" : "FAIL"
  console.log(isOk);

}

main().catch(console.error);