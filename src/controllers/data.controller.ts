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

        await DataModel.deleteMany({});

        const newData = new DataModel(updatedData[0]);
        await newData.save();

        return res.status(200).json({ success: true, message: 'Данные успешно обновлены' });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
};

export const searchData = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;

        if (typeof query !== 'string') {
            return res.status(400).json({ error: 'Invalid query parameter' });
        }

        const regex = new RegExp(query, 'i');

        // console.log('regex', regex);

        const result = await DataModel.findOne({});

        if (!result) {
            return res.status(404).json({ error: 'Data not found' });
        }

        const filteredCards = result.cards.flatMap((card) => {
            // const filteredThemes = card.themes.filter((theme) => theme.name.match(regex));

            const filteredTopics = card.themes.flatMap((theme) =>
                theme.topics.filter(
                    (topic) => topic.name.match(regex) || topic.route.match(regex) || topic.data.match(regex)
                )
            );

            return filteredTopics.length > 0 ? filteredTopics : [];
        });

        // console.log(filteredCards.filter((card) => card.length > 0));

        return res.status(200).json({ searchResults: filteredCards });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
};
