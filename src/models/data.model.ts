import mongoose, { Schema, Document } from 'mongoose';

// Определение схемы темы
export interface Topic extends Document {
    name: string;
    route: string;
    data: string;
}

// Определение схемы темы с неопределенными темами
export interface Theme extends Document {
    name: string;
    route: string; // Добавлено свойство route
    topics: Topic[];
}

// Определение основной схемы карточки
export interface Card extends Document {
    title: string;
    icon: string;
    description: string;
    route: string;
    themes: Theme[];
}

// Определение основной схемы данных
export interface Data extends Document {
    cards: Card[];
}

// Определение схемы документа MongoDB
export interface DataDocument extends Document, Data {}

// Определение схемы для темы
const TopicSchema = new Schema<Topic>({
    name: { type: String, required: true },
    route: { type: String, required: true },
    data: { type: String, required: true },
});

// Определение схемы для темы с неопределенными темами
const ThemeSchema = new Schema<Theme>({
    name: { type: String, required: true },
    topics: [TopicSchema],
});

// Определение схемы для карточки
const CardSchema = new Schema<Card>({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    route: { type: String, required: true },
    themes: [ThemeSchema],
});

// Определение основной схемы данных
const DataSchema = new Schema<Data>({
    cards: [CardSchema],
});

// Создание модели MongoDB
const DataModel = mongoose.model<DataDocument>('Data', DataSchema, 'Data');

export default DataModel;
