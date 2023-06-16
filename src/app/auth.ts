import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyAuth = (token: string): boolean => {
    try {
        const decoded = jwt.decode(token) as JwtPayload;
        if (decoded.exp && Date.now() / 1000 >= decoded.exp) {
            // El token ha expirado
            return false;
        }   
          // El token es válido
          return true;
    } catch (error) {
        return false;
    }
}