import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}
app.use(cors(corsOptions));


app.use('/api/v1', routes);


app.get('/', (req, res) => {
  res.send('Bye!-');
})



export default app;