import { updateDropSectionService } from '../../services/projectService';
import {
	addSectionService,
	archiveSectionService,
	getAllSectionService,
	updateTitleSectionService,
	updateTaskOrderInSection,
} from '../../services/sectionService';

import { GET_ALL_SECTION_API } from '../types/SectionTypes';
import {
	getProjectApi,
	updateDropSection,
	updateDropSectionApi,
} from './ProjectAction';

export const getAllSectionApi = projectId => {
	return async dispatch => {
		const { data } = await getAllSectionService(projectId);

		dispatch({
			type: GET_ALL_SECTION_API,
			dataSection: data,
		});
	};
};

export const addSectionApi = newSection => {
	return async dispatch => {
		const { data } = await addSectionService(newSection);

		await dispatch(getProjectApi(data.projectId));
		// console.log(data);
		//to update sectionOrder after add section
		await dispatch(getProjectApi(data.projectId));

		dispatch(getAllSectionApi(newSection.projectId));
	};
};

export const updateTitleSectionApi = dataSection => {
	return async dispatch => {
		const { data } = await updateTitleSectionService(dataSection);

		dispatch(getAllSectionApi(data.projectId));
	};
};

export const addSectionLeftRightApi = (
	newSection,
	sectionOrder,
	indexAddSection
) => {
	return async dispatch => {
		const newSectionOrder = [...sectionOrder];

		const { data } = await addSectionService(newSection);

		newSectionOrder.splice(indexAddSection, 0, data._id);

		//to update sectionOrder after add section left right
		await dispatch(updateDropSectionApi(newSectionOrder, data.projectId));

		dispatch(getAllSectionApi(newSection.projectId));
	};
};

export const archiveSectionApi = sectionId => {
	return async dispatch => {
		const { data } = await archiveSectionService(sectionId);
		dispatch(getAllSectionApi(data.projectId));
	};
};

export const updateTaskOrderInSectionApi = (newTaskOrder, sectionId) => {
	const data = { newTaskOrder, sectionId };
	return async (dispatch) => {
		const result = await updateTaskOrderInSection(data);
		// console.log(result);
		dispatch(getAllSectionApi(result.data.projectId))
	};
};
