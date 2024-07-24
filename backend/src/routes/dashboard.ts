import { Router } from "express";
import { verifyUser } from "../middlewares/user";
import controller from "../controllers/dashboard";
import { verifyAdmin } from "../middlewares/admin";

const router = Router();

router.use("/user", verifyUser);
router.use("/admin", verifyAdmin);

router.route("/user/users").get(controller.fetchUser);

router.route("/admin/users").get(controller.fetchUserAdmin);

export default router;
