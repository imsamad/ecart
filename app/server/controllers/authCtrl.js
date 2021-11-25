const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role: role ?? "customer",
  });

  const isEmailService = process.env.EMAIL_SERVICE === "ON";

  //  grab token and send to email
  const confirmEmailToken = user.generateEmailConfirmToken();

  //  Create reset url

  const confirmEmailURL = isEmailService
    ? `${req.protocol}://${req.headers.host}/confirmemail?token=${confirmEmailToken}`
    : `/confirmemail?token=${confirmEmailToken}`;

  await user.save({ validateBeforeSave: false });

  if (isEmailService) {
    const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;
    const sendResult = await sendEmail({
      email: user.email,
      subject: "Email confirmation token",
      message,
    });
    return res.json({
      success: true,
      data: {
        message: `Go To ${email} to  Confirm Email.`,
        emailSent: true,
      },
    });
  } else {
    return res.json({
      success: true,
      data: { message: confirmEmailURL, emailSent: false },
    });
  }
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  // console.log('req.body', req.body);
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email, isEmailConfirmed: true }).select(
    "+password"
  );
  // console.log('user found', user);
  if (!user) {
    return next(new ErrorResponse("Invalid Email", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Password", 401));
  }
  user.password = undefined;
  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  // res.cookie('token', 'none', {
  //   expires: new Date(Date.now() + 10 * 1000),
  //   httpOnly: true,
  // });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: {
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        password: user.password,
      },
    },
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  let emailIsDiff = req.body.email !== user.email.toString();
  const uNameIsDiff = req.body.username !== user.username.toString();
  const profileIsDiff = emailIsDiff || uNameIsDiff;

  let resMsg = {};

  if (emailIsDiff) {
    const emailIsRegistered = await User.find({ email: req.body.email });

    if (emailIsRegistered.length) {
      return next(new ErrorResponse("Email is already registered.", 422));
    }
    user.emailToConfirm = req.body.email;

    const confirmEmailToken = user.generateEmailConfirmToken();

    const isEmailService = process.env.EMAIL_SERVICE === "ON";

    const confirmEmailURL = isEmailService
      ? `${req.protocol}://${req.headers.host}/confirmemail?token=${confirmEmailToken}`
      : `/confirmemail?token=${confirmEmailToken}`;

    if (isEmailService) {
      const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

      const sendResult = await sendEmail({
        email: user.email,
        subject: "Email confirmation token",
        message,
      });

      resMsg.message =
        emailIsDiff = `Go To ${confirmEmailURL} to  Confirm Email.`;
    } else {
      resMsg.message = confirmEmailURL;
    }
  }
  if (uNameIsDiff) {
    user.username = req.body.username;
  }
  if (profileIsDiff) {
    user = await user.save();
  }

  resMsg = { ...resMsg, profileIsDiff, emailIsDiff };

  sendTokenResponse(user, 200, res, resMsg);
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  // const resetUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/auth/resetpassword/${resetToken}`;
  const isEmailService = process.env.EMAIL_SERVICE === "ON";

  const resetUrl = isEmailService
    ? `${req.protocol}:${req.get(
        "host"
      )}/api/v1/auth/resetpassword/${resetToken}`
    : `/resetpassword?token=${resetToken}`;

  try {
    if (isEmailService) {
      const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
      const sendResult = await sendEmail({
        email: user.email,
        subject: "Email confirmation token",
        message,
      });
      return res.json({
        success: true,
        data: {
          message: `Go To ${email} to  Reset Email.`,
          emailSent: true,
        },
      });
    } else {
      return res.json({
        success: true,
        data: { message: resetUrl, emailSent: false },
      });
    }
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // sendTokenResponse(user, 200, res);
  res.json({
    success: true,
    data: { message: "Password changes successfully." },
  });
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.confirmEmail = asyncHandler(async (req, res, next) => {
  // grab token from email
  const { token } = req.query;

  if (!token) {
    return next(new ErrorResponse("Invalid Token", 400));
  }

  const splitToken = token.split(".")[0];
  const confirmEmailToken = crypto
    .createHash("sha256")
    .update(splitToken)
    .digest("hex");

  // get user by token
  let user = await User.findOne({
    confirmEmailToken,
  });
  console.log("useruser ", user);
  if (!user) {
    return next(new ErrorResponse("Invalid Token", 400));
  }
  //check if existed user confirming email,which he/she requested to update.
  if (user.isEmailConfirmed && user.emailToConfirm) {
    user.email = user.emailToConfirm;
    user.emailToConfirm = undefined;
  }
  // update confirmed to true
  user.confirmEmailToken = undefined;
  user.isEmailConfirmed = true;

  // save
  user = await user.save({ validateBeforeSave: false });

  // return token
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, extraInfo) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  // .cookie('token', token, options)
  res.status(statusCode).json({
    success: true,
    data: {
      user: {
        token,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      ...extraInfo,
    },
  });
};
