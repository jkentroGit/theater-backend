const jwt = require('jsonwebtoken');

function generateAccessToken(user){

  const payload = {
    username: user.username,
    email: user.email,
    role: user.role
  }

  const secret = process.env.TOKEN_SECRET;
  const options = { expiresIn: '10m'};

  return jwt.sign(payload, secret, options);
}


function verifyAccessToken(token){

  const secret = process.env.TOKEN_SECRET;
  
  try {
    const payload = jwt.verify(token, secret);
    console.log ("To token είναι έγκυρο")
    return { verified: true, data: payload }
  

  } catch (err) {
    console.log ("To token δεν είναι έγκυρο")
    return { verified: false, data: err.message }
  }
}

module.exports = { generateAccessToken, verifyAccessToken }