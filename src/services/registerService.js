import { post } from '../utils/request';

export const registerService = async values => {
	try {
		const respone = await post('user/register', values);
		return respone;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};
