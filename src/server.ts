import dotenv from "dotenv"
dotenv.config({ path: './local.env' });

import app from "./app"
import mongoose from "mongoose";

if (!process.env.DATABASE_URL || !process.env.DATABASE_PASSWORD) {
  throw new Error(
    'Database URL or Database password is not defined in environment variables!'
  );
}
const DB_URL = process.env.DATABASE_URL?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// process.on('uncaughtException', (err, origin) => {
//   //code to log the errors
//   console.log(
//      `Caught exception: ${err}\n` +
//      `Exception origin: ${origin}`,
//    );
//  });

try {
  DB_URL &&
    mongoose.connect(DB_URL).then((_con) => {
      // console.log(con.connections);
      console.log('Database connected!');
    });
} catch (error) {
  console.error('Error connecting to database:', error);
}

const port = 3000; // You can choose any available port

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});