import { ColumnService } from "~/services/column.service";
import { HttpStatusCode } from '~/utilities/constants';

const createNew = async (req, res) => {
    try {
        const result = await ColumnService.createNew(req.body);
        res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
    console.log(req.body);
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ColumnService.update(id, req.body);
        res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
    console.log(req.body);
}

export const ColumnController = { createNew, update }