import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import { connectDB, closeDB } from './config/db';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Start server after DB connects
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to DB:', err);
  process.exit(1);
});

// Graceful shutdown
const shutdown = async () => {
  console.log('\n🛑 Shutting down server...');
  server.close(async (err) => {
    if (err) {
      console.error('❌ Error during server close:', err);
      process.exit(1);
    }

    try {
      await closeDB(); // Ensure DB disconnects properly
      console.log('✅ Server and DB closed gracefully.');
      process.exit(0);
    } catch (err) {
      console.error('❌ Error during DB close:', err);
      process.exit(1);
    }
  });
};

process.on('SIGINT', shutdown);   // Ctrl+C
process.on('SIGTERM', shutdown);  // Cloud shutdown
