const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({status:false, message: "Δεν υπάρχει token"});
  }

  const result = authService.verifyAccessToken(token);
  
  if (result.verified) {
    
    req.user = result.data
    console.log("Το token είναι έγκυρο")
    next();
    
  } else {
    console.log("Πρόβλημα με το token")
    return res.status(403).json({status: false, data: result.data})    
  } 
}

function verifyRole(allowedRole) {
  return (req, res, next) => {
    
    if((!req.user || !req.user.role)) {
      return res.status(403).json({status: false, data: "Δεν υπάρχει ρόλος χρήστη"})
    }

    const userRole = req.user.role;
    const hasPermission = (userRole === allowedRole);

    if (!hasPermission) {
      return res.status(403).json({status: false, data: "Δεν υπάρχει εξουσιοδότηση χρήστη"})
    }

    console.log("Επιτυχημένη εξουσιοδότηση χρήστη")
    next()
  }
}

module.exports = { verifyToken, verifyRole }