import { Router } from "express";
import userController from "../controllers/user/request";
import { verifyUser } from "../middlewares/user";
import { verifyAdmin } from "../middlewares/admin";
import adminController from "../controllers/admin/request";

const router = Router();

router.use("/user", verifyUser);
router.use("/admin", verifyAdmin);

router
  .route("/user/request")
  .get(userController.request)
  .delete(userController.retract);

router.route("/user/sent").get(userController.fetchSent);
router.route("/user/received").get(userController.fetchReceived);
router.route("/user/ongoing").get(userController.fetchOngoing);

router
  .route("/user/request/accept")
  .get(userController.accept)
  .delete(userController.reject);

router
  .route("/admin/request")
  .get(adminController.fetchRequest)
  .put(adminController.approve)
  .delete(adminController.reject);

export default router;
