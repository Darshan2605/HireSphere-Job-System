export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Important for cross-site cookies
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message,
  });
};
