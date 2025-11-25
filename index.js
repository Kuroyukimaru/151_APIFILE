const express = require('express');
const connectDatabase = require('./config/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contoh route langsung tanpa folder routes
app.get('/api/v1', (req, res) => {
    res.json({ message: 'API is running without routes folder!' });
});

async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}

startServer();
