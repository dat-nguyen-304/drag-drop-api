import Joi from 'joi';
import { getDB } from '~/config/mongodb.js';

const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        console.log('value: ', value)

        const result = await getDB().collection(cardCollectionName).insertOne(value);
        console.log('result: ', result);
        return value;
    } catch (e) {
        console.log(e);
    }
}

export const ColumnModel = { createNew }