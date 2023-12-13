

// user.permissions.forEach(permission => {
//     if (options.allowedGroup.indexOf(permission)){
//         // if authenticated
//         return next();
//     }
// }


//Send permissions and current role with login data login success


const jwt = require('jsonwebtoken');
const { User, UserRole } = require('./models');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, 'your_secret_key', async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = await User.findById(user.userId);
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

module.exports = { authenticateToken, authorizeRole };
