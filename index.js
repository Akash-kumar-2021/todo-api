const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage
let dataStore = [];
let currentId = 1;

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
    if (itemIndex > -1) {
        dataStore.splice(itemIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
