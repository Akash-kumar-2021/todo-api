const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

// In-memory storage with initial data
let dataStore = [
    { id: 1, name: 'Akash' },
    { id: 2, name: 'Kumar' },
    { id: 3, name: 'Tum Bin' },
    { id: 4, name: 'Checking' },
    { id: 5, name: 'Checking cron added' },
];
let currentId = 6; // Start ID from next available value

// Create
app.post('/api/data', (req, res) => {
    const newItem = { id: currentId++, ...req.body };
    dataStore.push(newItem);
    res.status(201).json(newItem);
});

// Read all
app.get('/api/data', (req, res) => {
    res.status(200).json(dataStore);
});

// Read by ID
app.get('/api/data/:id', (req, res) => {
    const item = dataStore.find(d => d.id === parseInt(req.params.id));
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Update
app.put('/api/data/:id', (req, res) => {
    let item = dataStore.find(d => d.id === parseInt(req.params.id));
    if (item) {
        item = { ...item, ...req.body };
        dataStore = dataStore.map(d => (d.id === parseInt(req.params.id) ? item : d));
        res.status(200).json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Delete
app.delete('/api/data/:id', (req, res) => {
    const itemIndex = dataStore.findIndex(d => d.id === parseInt(req.params.id));
    console.log(`Request to delete ID: ${req.params.id}`); // Debugging line
    if (itemIndex > -1) {
        console.log('Item found, deleting:', dataStore[itemIndex]); // Debugging line
        dataStore.splice(itemIndex, 1);
        res.status(204).end();
    } else {
        console.log('Item not found, cannot delete'); // Debugging line
        res.status(404).json({ message: 'Item not found' });
    }
    console.log('Current dataStore:', dataStore); // Debugging line
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
