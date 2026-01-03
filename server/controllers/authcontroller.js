const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  signupSchema,
  signinSchema,
  acceptCodeSchema,
  passwordSchema,
  acceptforgotCodeSchema,
} = require("../middleware/validator");

const { doHash, dohashValidation, hmacProcess } = require("../utills/hashing");
const { transport } = require("../middleware/sendmail");

// =============== SIGNUP ===============
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { error } = signupSchema.validate({ name, email, password });
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    // Check existing user or pending user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const existingPending = await prisma.pendingUser.findUnique({
      where: { email },
    });
    if (existingPending) {
      if (existingPending.otpExpiry < new Date()) {
        await prisma.pendingUser.delete({ where: { email } });
      } else {
        return res.status(400).json({
          success: false,
          message:
            "OTP already sent. Please check your email or wait until it expires.",
        });
      }
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // ✅ HMAC the OTP before saving
    const hashedOtp = hmacProcess(
      otp,
      process.env.HMAC_VARIFICATION_CODE_SECRET
    );

    const hashedPassword = await doHash(password, 12);

    await prisma.pendingUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
        otp: hashedOtp,
        otpExpiry,
      },
    });

    // Send plain OTP via email
    await transport.sendMail({
  from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
  to: email,
  subject: `Verify your identity - Ajay Kumar Saini`,
html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; color: #334155;">
  
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
    
    <div style="height: 6px; background: linear-gradient(to right, #4f46e5, #9333ea); width: 100%;"></div>

    <div style="padding: 40px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
          Ajay Kumar Saini
        </h1>
        <p style="margin: 4px 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #64748b;">
          Development & Design
        </p>
      </div>

      <div style="text-align: center;">
        <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1e293b;">
          Verify Your Email Address
        </h2>
        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #475569;">
          You requested a secure verification code to sign in. Please enter the code below to continue.
        </p>

        <div style="margin: 32px 0;">
          <div style="display: inline-block; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 32px; text-align: center;">
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; color: #4f46e5; letter-spacing: 8px; display: block;">
              ${otp}
            </span>
          </div>
        </div>

        <p style="margin: 0; font-size: 14px; color: #64748b;">
          This code will expire in <strong>10 minutes</strong>.
        </p>
        <p style="margin-top: 8px; font-size: 13px; color: #94a3b8;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    </div>

    <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        &copy; ${new Date().getFullYear()} Ajay Kumar Saini. All rights reserved.<br>
        Jaipur, Rajasthan, India
      </p>
      <div style="margin-top: 12px;">
        <a href="${process.env.NEXT_PUBLIC_URL}" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 8px;">Website</a>
        <a href="mailto:nabalsaini231@gmail.com" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 8px;">Contact Support</a>
      </div>
    </div>
  </div>

</body>
</html>
`,
});

    res.status(201).json({
      success: true,
      message: "Signup initiated. OTP sent to your email.",
      email,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// =============== VERIFY OTP ===============
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const pendingUser = await prisma.pendingUser.findUnique({ where: { email } });
    if (!pendingUser)
      return res.status(404).json({ success: false, message: "No pending signup found" });

    const hashedInputOtp = hmacProcess(otp, process.env.HMAC_VARIFICATION_CODE_SECRET);

    if (pendingUser.otp !== hashedInputOtp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (pendingUser.otpExpiry < new Date())
      return res.status(400).json({ success: false, message: "OTP expired" });

    // Move pending user → user table
    const newUser = await prisma.user.create({
      data: {
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password,
        verified: true,
      },
    });

    // Delete pending record
    await prisma.pendingUser.delete({ where: { email } });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "This user does not singup pls try again later",
      });
    }
       const token = jwt.sign(
      {
        userId: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        verified: existingUser.verified,
        role: existingUser.role, 
      },
      process.env.Secret_Token,
      { expiresIn: "8h" }
    );

    res
      .cookie("Authorization", "Bearer " + token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 8 * 3600000,
      })
      .json({
        success: true,
        token,
        user: {
          name: existingUser.name,
          email: existingUser.email,
          photoUrl: existingUser.photoUrl || "/default-avatar.png",
        },
        message: "Logged in successfully",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// =============== RESEND SIGNUP OTP ===============
exports.resendSignupOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if a pending signup exists
    const pendingUser = await prisma.pendingUser.findUnique({ where: { email } });

    if (!pendingUser) {
      return res.status(404).json({
        success: false,
        message: "No pending signup found for this email.",
      });
    }

    // Prevent abuse — only allow resend if last OTP expired or > 60 seconds since last one
    const now = new Date();
    const timeSinceLastOtp = now - new Date(pendingUser.otpExpiry) + 5 * 60 * 1000; // original expiry - 5min window

    if (timeSinceLastOtp < 60 * 1000) {
      return res.status(429).json({
        success: false,
        message: "Please wait at least 1 minute before requesting a new OTP.",
      });
    }

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // Hash the new OTP
    const newHashedOtp = hmacProcess(
      newOtp,
      process.env.HMAC_VARIFICATION_CODE_SECRET
    );

    // Update the pending user record
    await prisma.pendingUser.update({
      where: { email },
      data: {
        otp: newHashedOtp,
        otpExpiry: newOtpExpiry,
      },
    });

    // Send new OTP email
    await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: email,
     subject: `Verify your identity - Ajay Kumar Saini`,
html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; color: #334155;">
  
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
    
    <div style="height: 6px; background: linear-gradient(to right, #4f46e5, #9333ea); width: 100%;"></div>

    <div style="padding: 40px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
          Ajay Kumar Saini
        </h1>
        <p style="margin: 4px 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #64748b;">
          Development & Design
        </p>
      </div>

      <div style="text-align: center;">
        <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1e293b;">
          Verify Your Email Address
        </h2>
        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #475569;">
          You requested a secure verification code to sign in. Please enter the code below to continue.
        </p>

        <div style="margin: 32px 0;">
          <div style="display: inline-block; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 32px; text-align: center;">
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; color: #4f46e5; letter-spacing: 8px; display: block;">
              ${otp}
            </span>
          </div>
        </div>

        <p style="margin: 0; font-size: 14px; color: #64748b;">
          This code will expire in <strong>10 minutes</strong>.
        </p>
        <p style="margin-top: 8px; font-size: 13px; color: #94a3b8;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    </div>

    <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        &copy; ${new Date().getFullYear()} Ajay Kumar Saini. All rights reserved.<br>
        Jaipur, Rajasthan, India
      </p>
      <div style="margin-top: 12px;">
        <a href="${process.env.NEXT_PUBLIC_URL}" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 8px;">Website</a>
        <a href="mailto:nabalsaini231@gmail.com" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 8px;">Contact Support</a>
      </div>
    </div>
  </div>

</body>
</html>
`,
    });

    res.status(200).json({
      success: true,
      message: "A new OTP has been sent to your email.",
    });
  } catch (err) {
    console.error("❌ Resend OTP error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// =============== SIGNIN ===============
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = signinSchema.validate({ email, password });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "This user does not exist. Please sign up.",
      });
    }

    const isValid = await dohashValidation(password, existingUser.password);
    if (!isValid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      {
        userId: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        verified: existingUser.verified,
        role: existingUser.role, 
      },
      process.env.Secret_Token,
      { expiresIn: "8h" }
    );

    res
      .cookie("Authorization", "Bearer " + token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 8 * 3600000,
      })
      .json({
        success: true,
        token,
        user: {
          name: existingUser.name,
          email: existingUser.email,
          photoUrl: existingUser.photoUrl || "/default-avatar.png",
        },
        message: "Logged in successfully",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// =============== SIGNOUT ===============
exports.signout = async (req, res) => {
  try {
    return res
      .cookie("Authorization")
      .status(200)
      .json({ success: true, message: "logged out successfully" });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

// =============== SEND VERIFICATION CODE (Resend) ===============
exports.sendVarificationcode = async (req, res) => {
  const { email } = req.body;
  try {
    const existinguser = await prisma.user.findUnique({ where: { email } });
    if (!existinguser)
      return res.status(404).json({
        success: false,
        message: "This user does not exist. Please sign up.",
      });

    if (existinguser.verified)
      return res.status(400).json({ message: "User already verified" });

    const codevalue = Math.floor(100000 + Math.random() * 900000).toString();

    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: existinguser.email,
      subject: "Verification code",
      html: `<h1>${codevalue}</h1>`,
    });

    if (info.accepted[0] === existinguser.email) {
      const hashedcodevalue = hmacProcess(
        codevalue,
        process.env.HMAC_VARIFICATION_CODE_SECRET
      );
      await prisma.user.update({
        where: { email },
        data: {
          verificationCode: hashedcodevalue,
          verificationCodeValidation: new Date(),
        },
      });
      return res.status(200).json({
        success: true,
        message: "Verification code sent successfully",
      });
    }
    return res
      .status(400)
      .json({ success: false, message: "Code send failed!" });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

// =============== VERIFY RESENT CODE ===============
exports.varifyVarificationCode = async (req, res) => {
  const { email, varificationCode } = req.body;
  if (!email || !varificationCode)
    return res.json({ message: "Kindly add email and varificationCode" });

  try {
    const { error } = acceptCodeSchema.validate({ email, varificationCode });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0] });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "This user does not exist. Please sign up.",
      });
    if (user.verified)
      return res.status(400).json({ message: "User already verified" });

    if (!user.verificationCode || !user.verificationCodeValidation) {
      return res
        .status(401)
        .json({ message: "Code not sent earlier, please resend" });
    }
    if (
      Date.now() - user.verificationCodeValidation.getTime() >
      5 * 60 * 1000
    ) {
      return res.status(401).json({ message: "The code is expired!" });
    }

    const hashedcodevalue = hmacProcess(
      varificationCode.toString(),
      process.env.HMAC_VARIFICATION_CODE_SECRET
    );
    if (hashedcodevalue === user.verificationCode) {
      await prisma.user.update({
        where: { email },
        data: {
          verified: true,
          verificationCode: null,
          verificationCodeValidation: null,
        },
      });
      return res
        .status(201)
        .json({ success: true, message: "Your verification is done!" });
    }
  } catch (err) {
    console.log(err);
  }
};

// =============== CHANGE PASSWORD ===============
exports.ChangePassword = async (req, res) => {
  const { userId } = req.user;
  const { oldpassword, newpassword } = req.body;

  try {
    const { error } = passwordSchema.validate({ oldpassword, newpassword });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0] });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "This user does not exist" });

    const result = await dohashValidation(oldpassword, user.password);
    if (!result)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });

    const hashnewPassword = await doHash(newpassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashnewPassword },
    });

    return res.status(200).json({ success: true, message: "Password updated" });
  } catch (error) {
    console.log(error);
  }
};

// =============== FORGOT PASSWORD SEND CODE ===============
exports.sendforgetcode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "This user does not exist. Please sign up.",
      });

    const codevalue = Math.floor(100000 + Math.random() * 900000).toString();
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: user.email,
      subject: "Forgot Password Code",
      html: `<h1>${codevalue}</h1>`,
    });

    if (info.accepted[0] === user.email) {
      const hashedcodevalue = hmacProcess(
        codevalue,
        process.env.HMAC_VARIFICATION_CODE_SECRET
      );
      await prisma.user.update({
        where: { email },
        data: {
          forgotPasswordCode: hashedcodevalue,
          forgotPasswordCodevalidation: new Date(),
        },
      });
      return res.status(200).json({
        success: true,
        message: "Forgot password code sent successfully",
      });
    }
    return res
      .status(400)
      .json({ success: false, message: "Code send failed!" });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

// =============== VERIFY FORGOT PASSWORD + RESET ===============
exports.varifyforgotCode = async (req, res) => {
  const { email, varificationCode, newpassword } = req.body;

  try {
    const { error } = acceptforgotCodeSchema.validate({
      email,
      varificationCode,
      newpassword,
    });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0] });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "This user does not exist" });

    if (!user.forgotPasswordCode || !user.forgotPasswordCodevalidation) {
      return res
        .status(401)
        .json({ message: "Code not sent earlier, please resend" });
    }
    if (
      Date.now() - user.forgotPasswordCodevalidation.getTime() >
      5 * 60 * 1000
    ) {
      return res.status(401).json({ message: "The code is expired!" });
    }

    const hashedcodevalue = hmacProcess(
      varificationCode.toString(),
      process.env.HMAC_VARIFICATION_CODE_SECRET
    );
    if (hashedcodevalue === user.forgotPasswordCode) {
      const hashnewPassword = await doHash(newpassword, 12);
      await prisma.user.update({
        where: { email },
        data: {
          password: hashnewPassword,
          verified: true,
          forgotPasswordCode: null,
          forgotPasswordCodevalidation: null,
        },
      });
      return res
        .status(201)
        .json({ success: true, message: "Your password reset!" });
    }
  } catch (err) {
    console.log(err);
  }
};

// =============== UPLOAD PHOTO ===============
exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const fileUrl = `/uploads/${req.file.filename}`;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { photoUrl: fileUrl },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Photo uploaded successfully",
      photoUrl: user.photoUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    res.status(200).json({
      success: true,
      message: "Name updated successfully",
      user: { name: updatedUser.name },
    });
  } catch (error) {
    console.error("❌ Error updating name:", error);
    res.status(500).json({ message: "Failed to update name" });
  }
};

exports.verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token" });

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.Secret_Token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Verify failed:", err);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

const cleanExpiredPendingUsers = async () => {
  try {
    const now = new Date();

    // 30 minutes ago
    const thirtyMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

    const result = await prisma.pendingUser.deleteMany({
      where: {
        createdAt: { lt: thirtyMinutesAgo },
      },
    });

    if (result.count > 0) {
      console.log(`🧹 Cleaned ${result.count} expired pending users (older than 30 minutes)`);
    }
  } catch (err) {
    console.error("❌ Cleanup failed:", err);
  }
};

// 🕒 Run every 30 minutes
setInterval(cleanExpiredPendingUsers, 15 * 60 * 1000);

