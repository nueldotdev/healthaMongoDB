const path = require('path');
const express = require('express');
const app = express();
// mongo connections
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set up MongoDB connection to local database
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

let database;


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// API Code will be up here
app.delete('/api/:collectionName/:id', async (req, res) => {
    const id = req.params.id;
    const collectionName = req.params.collectionName;

    try {
        const result = await database.collection(collectionName).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            throw new Error(`${collectionName} with id ${id} not found`);
        }

        res.status(200).json({ message: `${collectionName} deleted successfully` });
    } catch (error) {
        console.error(`Error deleting ${collectionName}:`, error);
        res.status(500).json({ error: `Failed to delete ${collectionName}` });
    }
});



/// Example API route to fetch from any collection
// We just pass in the name in the `:collectionName` area, which express reads as a parameter
app.get('/api/:collectionName', async (req, res) => {
    // console.log(req.params.collectionName)
    try {
        // The here we fetch the `collectionName` parameter from the request URL
        const Collection = database.collection(req.params.collectionName);
        const result = await Collection.find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new record to the specified collection
app.post('/api/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    const document = req.body;

    try {
        // Get reference to the database and collection
        // const database = client.db(database);
        const collection = database.collection(collectionName);

        // Insert the document into the collection
        const result = await collection.insertOne(document);

        // Return the inserted document with its generated ObjectId
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error adding document to collection:', error);
        res.status(500).json({ error: 'Failed to add document to collection' });
    }
});

app.put('/api/:collectionName/:id', async (req, res) => {
    const collectionName = req.params.collectionName;
    const id = req.params.id;
    const updatedDocument = req.body;

    try {
        // Get reference to the database and collection
        // const database = client.db('your_database_name');
        const collection = database.collection(collectionName);

        // Update the document in the collection
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedDocument });

        // Check if the document was found and updated
        if (result.matchedCount === 0) {
            throw new Error(`${collectionName} not found`);
        }

        res.status(200).json({ message: `${collectionName} updated successfully` });
    } catch (error) {
        console.error(`Error updating ${collectionName}:`, error);
        res.status(500).json({ error: `Failed to update ${collectionName}` });
    }
});


app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    console.info('Home Page Active');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/admin', (req, res) => {
    console.info('Admin Entry');
    res.sendFile(path.join(__dirname, 'views', 'access.html'));
})

app.get('/admin/panel', (req, res) => {
    console.info('Admin Active');
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
})



// We now secure conneection to Mongo DB bfore the server runs 
// Without the Database connection the server will not run 
async function startServer() {
    try {
        await client.connect();
        console.info("Connected to database");
        database = client.db('healthaTestDB');

        // Start the server
        const PORT = 8080;
        app.listen(PORT, () => {
            console.info(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to database:", error); 
    }
}

startServer()