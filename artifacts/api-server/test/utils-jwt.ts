import jwt from 'jsonwebtoken';

export function generateTestJWT(payload = { role: 'admin' }, secret = process.env.JWT_SECRET || 'changeme-in-prod') {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });
}
