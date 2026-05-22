import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB', MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error', err);
  process.exit(1);
});
