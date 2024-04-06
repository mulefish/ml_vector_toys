from astrapy.db import AstraDB
from getAstaAPIToken import get_token_from_file

from astrapy.db import AstraDB

token = get_token_from_file()
astaUrl = "https://9b3690b6-f229-4ee7-b679-b5795df78bb1-us-east-2.apps.astra.datastax.com"
db = AstraDB(
    token=token, 
    api_endpoint=astaUrl,
    namespace="default_keyspace",
)
# print(db)

# metric will defined which sort strategy to use. I am a little squishy on what 'dimension' is doing here.
collection = db.create_collection("vector_test", dimension=5, metric="dot_product")
# "dimension": 5, // TODO: dimension = size of the array that the vectors will have? I think this is a hint to astra on how to organize things.
# "metric": "cosine" // Slow but no need to normalize the vectors first
# "metric": "dot_product" // Quick but have to normalize the vectors first
# "metric": "euclidean" // Good for Clustering


print(collection)

# Insert documents into the collection to have something to search for
documents = [
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
    },
]
res = collection.insert_many(documents)
print(res)

# Perform a similarity search! Notice that this vector is NOT and exact much!
# Sloppy logic is the best logic
query = [0.15, 0.1, 0.1, 0.35, 0.55]
results = collection.vector_find(query, limit=2, fields={"text", "$vector"})

for document in results:
    print(document)

# Delete the collection
res = db.delete_collection(collection_name="vector_test")
print(res)