import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import userRoutes from './route/users';
import { ApiError } from './utils/apiError';

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use('/api', userRoutes);

// Global error handler
app.use((err: ApiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.statusCode || 500).send({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

export default app;
