# ml_vector_toys
https://astra.datastax.com/org/c2581484-4f58-4f32-b877-8aefb282a340/database/9b3690b6-f229-4ee7-b679-b5795df78bb1/data-explorer?connectDialog=1

# token: 
See hidden file .mysecret.txt
It is from the above astra.datastax url

# login
same email as github/mulefish

# db name: 
mulefish_db

# pip ( jupyter ): 
!pip install --upgrade astrapy

# pip ( normal ): 
pip3 install astrapy 

# npm 
npm install @datastax/astra-db-ts

# example run ( node ): 
```code
node insertSome_andThenSearch.mjs 
{
  acknowledged: true,
  insertedCount: 3,
  insertedIds: [ '211', '111', '311' ]
}
i=0 id=311 vector=0.1,0.05,0.08,0.3,0.6 text=Reuben kicked his donkey. 
i=1 id=211 vector=0.45,0.09,0.01,0.2,0.11 text=If dinosaurs had a space program we would not be here. 
PASS
```

# example run ( python ):
```code
python insertSome_andThenSearch.py  
AstraDBCollection[astra_db="AstraDB[endpoint="https://9b3690b6-f229-4ee7-b679-b5795df78bb1-us-east-2.apps.astra.datastax.com", keyspace="default_keyspace"]", collection_name="vector_test"]
{'status': {'insertedIds': ['3', '1', '2']}}
{'_id': '3', 'text': 'A deep learning display that controls your mood', '$vector': [0.1, 0.05, 0.08, 0.3, 0.6], '$similarity': 0.7315}
{'_id': '2', 'text': 'An AI quilt to help you sleep forever', '$vector': [0.45, 0.09, 0.01, 0.2, 0.11], '$similarity': 0.604}
{'status': {'ok': 1}}
``` 
