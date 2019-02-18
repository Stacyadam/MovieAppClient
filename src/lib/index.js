import jwt from 'jsonwebtoken';

export const decodeJWT = () => {
	const token = localStorage.getItem('token');

	if (!token) return;
	return jwt.decode(token);
};

export const titleCase = title => {
	return title.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};
