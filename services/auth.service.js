const jwt = require('jsonwebtoken');

function generateAccessToken(user){

  const payload = {
    username: user.username,
    role: user.role
  }
//Διάρκεια token ανάλογα τον χρήστη//
  const secret = process.env.TOKEN_SECRET;
  const optionsADMIN = { expiresIn: '1h'};
  const optionsUSER = { expiresIn: '10m'};

  if (user.role === 'ADMIN') {return jwt.sign(payload, secret, optionsADMIN);
} else return jwt.sign(payload, secret, optionsUSER);
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