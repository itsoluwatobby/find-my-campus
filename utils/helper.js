import jwt from 'jsonwebtoken';
import { inspect } from 'util'
import { config } from '../config';

class Helper {
  appName = '[Find-My-Campus] >>>>';

  logger(message, status='log', colors = true) {
    if (status === 'log')
      console.log(inspect({ log: `${this.appName} ${message}` }, { colors }));
    else if (status === 'warn')
      console.warn(inspect({ log: `${this.appName} ${message}` }, { colors }));
    else if (status === 'info')
      console.info(inspect(`${this.appName} ${message}`, { colors }));
    else
      console.error(inspect({ log: `${this.appName} ${message}` }, { colors }));
  }

  verifyToken(token) {
    return jwt.verify(
      token,
      config.JWT_SECRET,
      { issuer: config.Issuer },
      (err, decoded) => {
        if (err.name === 'JsonWebTokenError') throw new Error('Bad Token Error');
        else if (err.name === 'TokenExpiredError') throw new Error('Token expired, Please login');
        else return decoded;
      }
    )
  }

  generateToken(length, expiresIn) {
    const CHARS = '1234567890';
  
  }
}
export const helper = new Helper();
