import { Router } from "express";
import { ProfileController } from "../controller/ProfileController";
import { validateRequestBody } from "../middleware/validate-request-body";
import { updateProfileSchema } from "../schema/profile-schema";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/", profileController.getMyProfile.bind(profileController));

profileRouter.put(
  "/",
  validateRequestBody(updateProfileSchema),
  profileController.putUpdateProfile.bind(profileController)
);

profileRouter.delete(
  "/",
  profileController.deleteProfile.bind(profileController)
);

export default profileRouter;
