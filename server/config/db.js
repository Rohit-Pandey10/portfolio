/**
 * db.js — MongoDB connection via Mongoose
 * Connection string is always read from process.env.MONGO_URI — never hardcoded.
 */

const mongoose = require('mongoose');

// Global cache for serverless environments (Vercel) to prevent connection pool exhaustion
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      console.log(`[DB] MongoDB connected: ${mongoose.connection.host}`);
      return mongoose;
    }).catch((err) => {
      console.error(`[DB] Connection error: ${err.message}`);
      cached.promise = null; // reset promise on failure
      // Don't crash the server on DB failure
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
