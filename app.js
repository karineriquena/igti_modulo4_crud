// Imports
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';

// Connect to MongoDB by Mongoose
(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://karineriquena:123qwe456@bootcamp-fullstack-igti.ecrqm.mongodb.net/grades?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log('Error to connect to mongodb: ' + error);
  }
})();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/students', studentRouter);

app.listen('3000', () => console.log('API iniciada'));
