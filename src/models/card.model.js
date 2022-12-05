import Joi from 'joi';
import { getDB } from '~/config/mongodb.js';
import { ObjectID } from 'mongodb';

const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
            boardId: ObjectID(validatedValue.boardId),
            columnId: ObjectID(validatedValue.columnId)
        }

        const result = await getDB().collection(cardCollectionName).insertOne(insertValue);
        console.log('result: ', result);
        return insertValue;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteByColumn = async (ids) => {
    try {
        ids = ids.map(id => ObjectID(id));
        const result = await getDB().collection(cardCollectionName).updateMany(
            { _id: { $in: ids } },
            { $set: { _destroy: true } }
        )
        return result;
    } catch (e) {
        throw new Error(e);
    }
}

export const CardModel = { cardCollectionName, createNew, deleteByColumn }