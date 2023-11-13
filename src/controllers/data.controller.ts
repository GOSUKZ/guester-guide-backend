import { Request, Response } from 'express';
import DataModel from '../models/data.model';

export const getData = async (req: Request, res: Response) => {
    try {
        const data = await DataModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};
