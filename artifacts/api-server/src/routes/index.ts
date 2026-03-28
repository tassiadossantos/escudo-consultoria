import { Router, type IRouter } from "express";

import healthRouter from "./health";
import consentRouter from "./consent";
import messagesRouter from "./messages";

const router: IRouter = Router();


router.use(healthRouter);
router.use(consentRouter);
router.use(messagesRouter);

export default router;
