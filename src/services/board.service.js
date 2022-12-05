import { BoardModel } from "~/models/board.model";
import { cloneDeep } from 'lodash';

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const getFullBoard = async (id) => {
    try {
        let board = await BoardModel.getFullBoard(id);
        if (!board || board.length === 0) {
            throw new Error('Board not found.');
        }
        board = board[0];
        const transformBoard = cloneDeep(board);
        transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)
        transformBoard.columns.forEach(column => {
            column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString());
        })
        delete transformBoard.cards;
        return transformBoard;
    } catch (error) {
        console.log(error.message);
        throw new Error(error);
    }
}

export const BoardService = { createNew, getFullBoard }