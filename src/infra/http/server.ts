import "reflect-metadata";

import express, { Request, Response, NextFunction }  from 'express';
import 'express-async-errors';
import cors from 'cors';

import '../../container';
import '../typeorm';
import AppError from '../../errors/AppError';

import routes from "./routes";

const app = express();

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME || '';

const corsOptions = {
  exposedHeaders: [
    'X-Total-Count'
  ]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

// Global error handling
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  console.error(err)

  return response.status(500).json({
    message: 'Error inesperado dentro do servidor'
  })
})

app.listen(port, () => console.log(`🖌  ${appName} server started on port ${port}`));