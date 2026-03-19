const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load Config
dotenv.config();

const requiredEnvs = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnvs.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  throw new Error(`Missing required env vars: ${missingEnv.join(', ')}`);
}

// Connect Database
connectDB();

const app = express();
app.disable('x-powered-by');

const allowedOrigins = Array.from(
  new Set(
    [
      'http://localhost:5173',
      process.env.FRONTEND_URL,
      ...(process.env.FRONTEND_URLS || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    ].filter(Boolean)
  )
);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('CORS origin not allowed'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Main Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, uptime: process.uptime() });
});

app.get('/', (req, res) => res.send('API is running'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
