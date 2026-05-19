const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {

    const token = req.headers.authorization;

    // token check
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // verify token
    const verify = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // user data save
    req.user = verify;

    next();

  } catch (error){
     console.log(error);
     
  }
}
module.exports = auth;