import { Router } from "express";
import controller from "../controllers/admin/admin";
import { verifyAdmin } from "../middlewares/admin";

const router = Router();

router.route("/signin").post(controller.signin);

router.use(verifyAdmin);

router.route("/signup").post(controller.signup);

router.route("/logout").delete(controller.logout);

router
  .route("/me")
  .get(controller.fetchProfile)
  .delete(controller.deleteProfile);

router.route("/user").delete(controller.deleteUser);

export default router;
