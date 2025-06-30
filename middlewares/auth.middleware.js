const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({status:false, message: "Access Denied."});
  }

  const result = authService.verifyAccessToken(token);
  
  if (result.verified) {
    req.user = result.data
    
    next();
    
  } else {
    return res.status(403).json({status: false, data: result.data})
  } 
}

function verifyRoles(allowedRole) {
  return (req, res, next) => {
    
    if((!req.user || !req.user.roles)) {
      return res.status(403).json({status: false, data: "Forbidden: no roles found"})
    }

    const userRole = req.user.role
    
    // const hasPermission = userRoles.some(role => allowedRole.includes(role));
    const hasPermission = userRole.includes(allowedRole)

    if (!hasPermission) {
      return res.status(403).json({status: false, data: "Forbidden: insufficient permissions"})
    }

    next()
  }
}

module.exports = { verifyToken, verifyRoles }