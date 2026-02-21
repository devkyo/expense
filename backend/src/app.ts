import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type, Authorization'],
}
app.use(cors(corsOptions));


app.use('/api/v1', routes);



app.get('/', (req, res) => {
  res.send('Bye!-');
})



export default app;