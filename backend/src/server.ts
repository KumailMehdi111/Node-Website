import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`[${new Date().toISOString()}] ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log(`[${new Date().toISOString()}] Server closed.`);
    process.exit(0);
  });
  // Force close after 10s
  setTimeout(() => {
    console.error(`[${new Date().toISOString()}] Forced shutdown after timeout.`);
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  console.error(`[${new Date().toISOString()}] Unhandled Rejection:`, reason);
});
process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] Uncaught Exception:`, err);
  shutdown('uncaughtException');
});
