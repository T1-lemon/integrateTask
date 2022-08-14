import {
	addSectionService,
	archiveSectionService,
	getAllSectionService,
	updateTitleSectionService,
} from '../../services/sectionService';

import { GET_ALL_SECTION_API } from '../types/SectionTypes';
import { getProjectApi, updateDropSectionApi } from './ProjectAction';

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

		// console.log(data);
		//to update sectionOrder after add section trên store
		//trên database đã tự động thêm vào section order
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

		console.log('section order after', newSectionOrder)
		const { data } = await addSectionService(newSection);

		console.log(data)
		console.log('index', indexAddSection);
		newSectionOrder.splice(indexAddSection, 0, data._id);
		console.log('section order before', newSectionOrder)
		
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
