import jwt from 'jsonwebtoken';

export const decodeJWT = () => {
	const token = localStorage.getItem('token');

	if (!token) return;
	return jwt.decode(token);
};

export const titleCase = title => {
	return title.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const sortBy = (a, b, sort = {}) => {
	switch (sort.type) {
		case 'rank':
			if (sort.desc) {
				return b.rank - a.rank;
			} else {
				return a.rank - b.rank;
			}
		case 'name':
			if (sort.desc) {
				const nameA = a.name.toUpperCase();
				const nameB = b.name.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			} else {
				const nameA = a.name.toUpperCase();
				const nameB = b.name.toUpperCase();
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
				return 0;
			}
		case 'user':
			if (sort.desc) {
				const nameA = a.user.email.toUpperCase();
				const nameB = b.user.email.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			} else {
				const nameA = a.user.email.toUpperCase();
				const nameB = b.user.email.toUpperCase();
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
				return 0;
			}
		default:
			break;
	}
};
