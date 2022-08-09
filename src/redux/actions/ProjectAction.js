import {
	
	UPDATE_DROP_SECTION,
	SET_CURRENT_PROJECT,
	GET_ALL_PROJECT_API,
} from '../types/ProjectTypes';

import {
	createProjectService,
	getAllProjectInWorkspaceService,
	archiveProjectService,
	unArchiveProjectService,
	getProjectService,
	updateDropSectionService,
} from '../../services/projectService';

// api
export const getAllProjectInWorkspaceApi = worksapceId => {
	return async dispatch => {
		const { data } = await getAllProjectInWorkspaceService(worksapceId);

		dispatch({
			type: GET_ALL_PROJECT_API,
			dataProject: data,
		});
	};
};

export const createProjectApi = dataProject => {
	return async dispatch => {
		const { data } = await createProjectService(dataProject);

		dispatch(getAllProjectInWorkspaceApi(data.workspaceId));
	};
};

export const archiveUnarchiveProjectApi = (status, projectId) => {
	return async dispatch => {
		const { data } = status
			? await archiveProjectService(projectId)
			: await unArchiveProjectService(projectId);

		dispatch(getAllProjectInWorkspaceApi(data.workspaceId));
	};
};

export const getProjectApi = projectId => {
	return async dispatch => {
		const { data } = await getProjectService(projectId);

		dispatch({
			type: SET_CURRENT_PROJECT,
			dataProject: data,
		});
	};
};

export const updateDropSectionApi = (newSectionOrder, projectId) => {
	return async dispatch => {
		const { data } = await updateDropSectionService(newSectionOrder, projectId);

		dispatch({
			type: SET_CURRENT_PROJECT,
			dataProject: data,
		});
	};
};

export const updateDropSection = newSectionOrder => {
	let action = {
		type: UPDATE_DROP_SECTION,
		newSectionOrder,
	};

	return action;
};

// móc data



export const addTaskAction = (nameNewTask, sectionId) => {
	let action = {
		type: 'ADD_TASK',
		nameNewTask,
		sectionId,
	};

	return action;
};
