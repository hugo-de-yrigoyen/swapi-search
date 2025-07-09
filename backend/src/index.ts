import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import searchRoutes from './routes/search';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', searchRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'The Death Star plans are secure', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'These are not the droids you are looking for...' });
});

app.listen(PORT, () => {
  console.log(`🚀 Rebel Alliance API running on port ${PORT}`);
  console.log(`📡 May the Force be with you!`);
});