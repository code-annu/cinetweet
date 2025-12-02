import { Router } from "express";
import { ProfileController } from "../controller/ProfileController";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  createProfileSchema,
  updateProfileSchema,
} from "../schema/profile-schema";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.post(
  "/",
  validateRequestBody(createProfileSchema),
  profileController.postCreateProfile.bind(profileController)
);

profileRouter.get(
  "/",
  profileController.getProfile.bind(profileController)
);

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

