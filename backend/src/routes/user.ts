import { Router } from "express";
import controller from "../controllers/user/user";
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

router.route("/auth").all(verifyUser).get(controller.fetchAuth);

export default router;
