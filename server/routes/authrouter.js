import express from "express";
import * as authcontroller from "../controllers/authcontroller.js";
import { identifier } from "../middleware/identifier.js";

const router = express.Router();

router.post("/signup", authcontroller.signup);
router.post("/verify-otp", authcontroller.verifyOtp);
router.post("/signin", authcontroller.signin);

router.post("/signout", identifier, authcontroller.signout);

router.post("/sendVerificationCode", authcontroller.sendVarificationcode);

router.patch(
  "/verify-code",
  identifier,
  authcontroller.varifyVarificationCode
);

router.patch(
  "/change-password",
  identifier,
  authcontroller.ChangePassword
);

router.patch(
  "/forgot-password-code",
  authcontroller.sendforgetcode
);

router.patch(
  "/forgot-password-code-validation",
  authcontroller.varifyforgotCode
);

router.patch(
  "/update-profile",
  identifier,
  authcontroller.updateProfile
);

router.get("/verify", identifier, authcontroller.verify);

router.post("/resend-otp", authcontroller.resendSignupOtp);

export default router;
