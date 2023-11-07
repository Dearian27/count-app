import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if(!token) return res.status(401).json({message: 'You are not authenticated'});
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) return res.status(403).json({ message: 'Token is invalid or expired'});
    req.user = user;
    req.isTeacher = user.status === 'teacher' || user.status === 'admin';
    next();
  })
}