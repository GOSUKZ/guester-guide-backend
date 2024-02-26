import { Router } from 'express';
import * as DataController from '../controllers/data.controller';

const dataRouter = Router();

dataRouter.get('/get-data', DataController.getData);
dataRouter.put('/update-data', DataController.updateData);
dataRouter.get('/search', DataController.searchData);

export default dataRouter;
