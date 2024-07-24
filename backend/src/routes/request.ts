import { Router } from "express";
import requestController from "../controllers/request";
import { verifyUser } from "../middlewares/user";

const router = Router();

router.use(verifyUser);

router
  .route("/request")
  .get(requestController.request)
  .delete(requestController.retract);

router.route("/sent").get(requestController.fetchSent);
router.route("/received").get(requestController.fetchReceived);
router.route("/ongoing").get(requestController.fetchOngoing);

export default router;
