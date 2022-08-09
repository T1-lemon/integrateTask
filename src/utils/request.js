import Axios from 'axios';

const request = Axios.create({
	baseURL: 'https://projectasana.herokuapp.com/api/',
});

export const post = async (url, data) => {
	const response = await request.post(url, data);
	return response;
};

