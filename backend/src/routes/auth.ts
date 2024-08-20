import { Router } from "express";
import controller from "../controllers/auth";
import { verifyAdmin } from "../middlewares/admin";
import { verifyUser } from "../middlewares/user";
import { checkAuthorization } from "../middlewares/auth";

const router = Router();

router
  .route("/check")
  .get(verifyAdmin, verifyUser, checkAuthorization, controller.fetchAuth);

export default router;
