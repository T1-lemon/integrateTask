import requestApi from '../utils/requestApi';

export const getAllTaskInProjectService = async projectId => {
	try {
		const respone = await requestApi({
			method: 'get',
			url: `task/8/${projectId}`,
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};
