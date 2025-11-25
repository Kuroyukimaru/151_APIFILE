const express = require('express');
const connectDatabase = require('./config/db');
const apiRoutes = require('./routers/api');

const app = express();
const PORT = 3000;

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Semua endpoint API ada di folder routers/api.js
app.use('/api', apiRoutes);

// Fungsi menjalankan server + konek ke database
async function startServer() {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    }
}

startServer();
