// Basic auth middleware for protected routes
export default function authMiddleware(req, res, next) {
  // Check for authorization header or token in cookies
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  // Add user to request object (can be expanded with actual verification)
  req.user = { authenticated: true };
  next();
}
