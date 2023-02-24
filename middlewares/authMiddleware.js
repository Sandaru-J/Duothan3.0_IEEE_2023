import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: 'Token is required' });
    return;
  }
  const token = authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

export default authMiddleware;
