import { Router } from "express";
import controller from "../controllers/user/user";
import authController from "../controllers/auth";
import { verifyUser } from "../middlewares/user";

const router = Router();

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);
router.route("/logout").all(verifyUser).delete(controller.logout);

router
  .route("/me")
  .all(verifyUser)
  .get(controller.fetchProfile)
  .put(controller.updateProfile)
  .delete(controller.deleteProfile);

export default router;
