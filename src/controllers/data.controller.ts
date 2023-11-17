import { Request, Response } from 'express';
import DataModel, { DataDocument, Card, Theme, Topic } from '../models/data.model';

export const getData = async (req: Request, res: Response) => {
    try {
        const data = await DataModel.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export const updateData = async (req: Request, res: Response) => {
    try {
        const updatedData = req.body;

        // Удаление всех документов в коллекции
        await DataModel.deleteMany({});

        // Создание нового документа и сохранение в базе данных
        const newData = new DataModel(updatedData[0]);
        await newData.save();

        return res.status(200).json({ success: true, message: 'Данные успешно обновлены' });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
};
