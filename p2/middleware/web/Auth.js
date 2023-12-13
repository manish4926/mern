const jwt = require('jsonwebtoken');
const Users = require('./../../model/user/Users');
const UserRole = require('./../../model/user/UserRoles');
//const getUserFromToken = require("../getUserFromToken");
const CORS = require('../CORS'); 
const asyncWrapper = require('../asyncWrapper');


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, 'your_secret_key', async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = await Users.findById(user.userId);
    next();
  });
};

const authorizeRole = (role) => {
  return async (req, res, next) => {
    const userId = req.user._id;
    const userRoles = await UserRole.find({ userId });

    const hasRole = userRoles.some((userRole) => {
      // Check if the user has the required role
      // userRole.roleId should be compared with the role you want to check
      return userRole.roleId === role;
    });

    if (!hasRole) return res.status(403).json({ message: 'Unauthorized' });

    next();
  };
};

//TODO Send permissions and current role with login data login success
// user.permissions.forEach(permission => {
//     if (options.allowedGroup.indexOf(permission)){
//         // if authenticated
//         return next();
//     }
// }



const setCurrentUser = (req, res, next) => {
    const token = req.header("authorization");
  
    // look up the user based on the token
    // const user = getUserFromToken(token).then(user => {
    //   // append the user object the the request object
    //   req.user = user;
  
    //   next();
    // });
    next();
};


const testMiddleWare = (req, res, next) => {
  return async (req, res, next) => {
    console.log("test middleware");
    next();
  }
  
};

module.exports = { authenticateToken, authorizeRole, testMiddleWare };
