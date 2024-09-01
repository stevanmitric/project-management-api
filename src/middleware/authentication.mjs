// Importing the jsonwebtoken library
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to generate a JWT token for a user
export const generateToken = user => {
  // Sign a new token with the user's id and email, using the secret key from environment variables
  return jwt.sign(
    { id: user.id, email: user.email },
    `${process.env.JWT_SECRET_KEY}`,
    { expiresIn: '1h' } // Token will expire in 1 hour
  );
};

// Middleware function to verify the JWT token in a request
export const verifyToken = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  // If no token is found, respond with an access denied error
  if (!token) return res.status(401).json({ error: 'Access denied!' });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    // Attach the user's id to the request object for use in later middleware/routes
    req.userId = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, respond with an invalid token error
    return res.status(401).json({ error: 'Invalid token!' });
  }
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
