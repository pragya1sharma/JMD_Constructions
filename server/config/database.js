const mongoose = require('mongoose');

/**
 * CONNECT TO MONGODB, update on disconnect, errorsm and graceful shutdown
 * Purpose: Establish connection to MongoDB database
 * Why async? Database connection takes time, we wait for it
 */
const connectDB = async () => {
  try {
    // mongoose.connect() returns a Promise, we await it
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
   
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected - attempting to reconnect...');
    });

    // Graceful shutdown on app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;