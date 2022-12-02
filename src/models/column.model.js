import Joi from 'joi';
import { getDB } from '~/config/mongodb.js';

const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        console.log('value: ', value)

        const result = await getDB().collection(columnCollectionName).insertOne(value);
        console.log('result: ', result);
        return value;
    } catch (e) {
        console.log(e);
    }
}

export const CardModel = { createNew }