import express from 'express';
import { CardController } from '~/controllers/card.controller';
import { CardValidation } from '~/validations/card.validation';

const router = express.Router();

router.route('/')
    .get((req, res) => console.log(123))
    .post(CardValidation.createNew, CardController.createNew)

export const CardRoutes = router;