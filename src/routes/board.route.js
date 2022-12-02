import express from 'express';
import { BoardController } from '~/controllers/board.controller';
import { BoardValidation } from '~/validations/board.validation';

const router = express.Router();

router.route('/')
    .get((req, res) => console.log(123))
    .post(BoardValidation.createNew, BoardController.createNew)

export const BoardRoutes = router;