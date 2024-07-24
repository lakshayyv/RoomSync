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

router.route("/request").all(verifyUser).get(userController.request);

router
  .route("/request/sent")
  .all(verifyUser)
  .get(userController.fetchSentRequest);

router
  .route("/request/received")
  .all(verifyUser)
  .get(userController.fetchReceivedRequest);

router.route("/request/admin").all(verifyUser).get(userController.fetchRequest);

export default router;
