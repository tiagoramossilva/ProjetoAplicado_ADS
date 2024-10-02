const admin = require('firebase-admin');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email); 
    const token = await admin.auth().createCustomToken(userCredential.uid);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Login falhou', details: error.message });
  }
};

module.exports = { loginUser };
