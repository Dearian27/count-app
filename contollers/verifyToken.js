import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if(!token) return res.status(401).json({message: 'Ви не зареєстровані.'});
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) return res.status(403).json({ message: 'Токен неправильний, або прострочений.'});
    req.user = user;
    req.isTeacher = user.status === 'teacher' || user.status === 'admin';
    next();
  })
}