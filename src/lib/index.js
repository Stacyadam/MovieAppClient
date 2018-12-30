import jwt from 'jsonwebtoken';

export const decodeJWT = () => {	
		const token = localStorage.getItem('token');

		if (!token) return;
		return jwt.decode(token);		
}