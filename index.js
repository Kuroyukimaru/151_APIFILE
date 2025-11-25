const express = require('express');
const connectDatabase = require('./config/db');
const apiRoutes = require('./routers/api');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
