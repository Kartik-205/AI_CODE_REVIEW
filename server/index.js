const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const reviewRoutes = require('./routes/review');
const historyRoutes = require('./routes/history');

const app = express();

app.use(helmet());
app.use(cors({ origin: "https://ai-code-review-iota-sand.vercel.app/" }));
app.use(express.json({ limit: '50kb' }));
app.use(morgan('dev'));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err.message));

app.use('/api/review', reviewRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => res.json({ message: 'AI Code Reviewer API is running' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
