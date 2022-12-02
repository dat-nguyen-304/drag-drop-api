import Joi from 'joi';
import { getDB } from '~/config/mongodb.js';

const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(20).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        console.log('value: ', value)

        const result = await getDB().collection(boardCollectionName).insertOne(value);
        console.log('result: ', result);
        return value;
    } catch (error) {
        throw new Error(error);
    }
}

export const BoardModel = { createNew }