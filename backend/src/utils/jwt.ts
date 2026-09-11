import jwt from 'jsonwebtoken';

interface JwtUser {
  id: string;
  role: string;
}

export const generateAccessToken = (user: JwtUser) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { algorithm: 'HS256', expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user: JwtUser) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET as string,
    { algorithm: 'HS256', expiresIn: '7d' }
  );
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret, { algorithms: ['HS256'] });
  } catch (error) {
    return null;
  }
};
