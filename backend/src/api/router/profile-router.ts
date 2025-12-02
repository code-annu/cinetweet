import { Router } from "express";
import { ProfileController } from "../controller/ProfileController";
import { validateRequestBody } from "../middleware/validate-request-body";
import { validateAuthorization } from "../middleware/validate-authorization";
import { updateProfileSchema } from "../schema/profile-schema";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get(
  "/",
  validateAuthorization,
  profileController.getProfile.bind(profileController)
);

profileRouter.put(
  "/",
  validateAuthorization,
  validateRequestBody(updateProfileSchema),
  profileController.putUpdateProfile.bind(profileController)
);

profileRouter.delete(
  "/",
  validateAuthorization,
  profileController.deleteProfile.bind(profileController)
);

export default profileRouter;

