const jwt = require('jsonwebtoken');

function generateAccessToken(user){

  const payload = {
    username: user.username,
    email: user.email,
    role: user.role
  }

  const secret = process.env.TOKEN_SECRET;
  const options = { expiresIn: '2h'};

  return jwt.sign(payload, secret, options);
}


function verifyAccessToken(token){
  const secret = process.env.TOKEN_SECRET;
  
  try {
    const payload = jwt.verify(token, secret);

    return { verified: true, data: payload }
  } catch (err) {
    return { verified: false, data: err.message }
  }
}



module.exports = { generateAccessToken, verifyAccessToken }