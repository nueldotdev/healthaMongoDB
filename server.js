const path = require('path');
const express = require('express');
const app = express();
// mongo connections
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set up MongoDB connection to local database
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

let database;


// API Code will be up here

// API route to fetch patients
app.get('/api/patients', async (req, res) => {
    try {
        const Collection = database.collection('patients');
        const result = await Collection.find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to fetch admin
app.get('/api/staff', async (req, res) => {
    try {
        const Collection = database.collection('staff');
        const result = await Collection.find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ error: 'Internal server error' });
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