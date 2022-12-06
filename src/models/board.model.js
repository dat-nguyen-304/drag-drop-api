import Joi from 'joi';
import { getDB } from '~/config/mongodb.js';
import { ColumnModel } from './column.model';
import { CardModel } from './card.model';
import { ObjectID } from 'mongodb';

const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
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

const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectID(boardId) },
            { $push: { columnOrder: columnId } },
            { returnOriginal: false }
        );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
}

const getFullBoard = async (id) => {
    try {
        const result = await getDB().collection(boardCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectID(id),
                    _destroy: false
                }
            },
            {
                $lookup: {
                    from: ColumnModel.columnCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }
            },
            {
                $lookup: {
                    from: CardModel.cardCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            }
        ]).toArray();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const update = async (id, data) => {
    try {
        const updateData = { ...data };
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
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

export const BoardModel = { createNew, getFullBoard, pushColumnOrder, update }