import { Router } from "express";
import userController from "../controllers/user";
import { verifyUser } from "../middlewares/user";

const router = Router();

router.route("/signup").post(userController.signup);
router.route("/signin").post(userController.signin);
router.route("/logout").all(verifyUser).delete(userController.logout);

router
  .route("/me")
  .all(verifyUser)
  .get(userController.fetchProfile)
  .put(userController.updateProfile)
  .delete(userController.deleteProfile);

export default router;
