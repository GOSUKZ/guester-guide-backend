import { Router } from 'express';
import * as DataController from '../controllers/data.controller';

const dataRouter = Router();

dataRouter.get('/get-data', DataController.getData);

export default dataRouter;
