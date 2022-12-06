import Joi from 'joi';
import { getDB } from '~/config/mongodb.js';
import { ObjectID } from 'mongodb';

const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
            boardId: ObjectID(validatedValue.boardId)
        }

        const result = await getDB().collection(columnCollectionName).insertOne(insertValue);
        console.log('result: ', result);
        return insertValue;
    } catch (error) {
        throw new Error(error);
    }
}

const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectID(columnId) },
            { $push: { cardOrder: cardId } },
            { returnOriginal: false }
        );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data
        }
        if (data.boardId) {
            updateData.boardId = ObjectID(data.boardId);
        }
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: updateData },
            { returnOriginal: false }
        );
        console.log('RESULT: ', result);
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
}

export const ColumnModel = { columnCollectionName, createNew, update, pushCardOrder }