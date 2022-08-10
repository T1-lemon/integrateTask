import {
	completeTaskService,
	getAllTaskInProjectService,
	updateTaskService,
	updateTitleTaskService,
	createTaskService,
} from '../../services/taskService';
import {
	GET_ALL_TASK_IN_PROJECT,
	GET_ALL_TASK_ORDER_IN_PROJECT,
	UPDATE_DROP_TASK,
} from '../types/TaskTypes';

import { getAllSectionApi, updateTaskOrderInSectionApi } from './SectionAction';
export const getAllTaskInProjectApi = projectId => {
	return async dispatch => {
		const { data } = await getAllTaskInProjectService(projectId);

		dispatch({
			type: GET_ALL_TASK_IN_PROJECT,
			dataTasks: data,
		});
	};
};

export const getAllTaskOrderAction = taskOrderInProject => {
	console.log('get', taskOrderInProject)
	let action = {
		type: GET_ALL_TASK_ORDER_IN_PROJECT,
		taskOrderInProject,
	};

	return action;
};

export const updateDropTask = (sectionIdDrop, newTaskOrder, taskDrag) => {
	let action = {
		type: UPDATE_DROP_TASK,
		sectionIdDrop,
		newTaskOrder,
		taskDrag,
	};

	return action;
};

export const updateTitleTaskApi = (taskId, taskName) => {
	return async dispatch => {
		const data = { taskId, taskName };
		const result = await updateTitleTaskService(data);

		dispatch(getAllTaskInProjectApi(result.data.projectId));
	};
};

export const completeTaskApi = taskId => {
	return async dispatch => {
		const result = await completeTaskService(taskId);

		dispatch(getAllTaskInProjectApi(result.data.projectId));
	};
};

export const setDateTaskApi = taskUpdate => {
	return async dispatch => {
		const { data } = await updateTaskService(taskUpdate);

		dispatch(getAllTaskInProjectApi(data.projectId));
	};
};

export const assignTaskApi = taskUpdate => {
	return async dispatch => {
		const { data } = await updateTaskService(taskUpdate);

		dispatch(getAllTaskInProjectApi(data.projectId));
	};
};

export const updatePriorityTaskApi = taskUpdate => {
	return async dispatch => {
		const { data } = await updateTaskService(taskUpdate);

		dispatch(getAllTaskInProjectApi(data.projectId));
	};
};

export const createTaskApi = (
	taskCreate,
	taskOrderInSection,
	isAddTask
) => {
	return async dispatch => {
		const { data } = await createTaskService(taskCreate);
		const newTaskOrderInSection = taskOrderInSection;
		// console.log('section id', data.sectionId)
		// console.log('task order before', newTaskOrderInSection)
		// console.log('isAddTask', isAddTask)
		isAddTask === 1
			? newTaskOrderInSection.push(data._id)
			: newTaskOrderInSection.splice(0,0,data._id);
		// console.log('new task order', newTaskOrderInSection)
		dispatch(updateTaskOrderInSectionApi(newTaskOrderInSection, data.sectionId));
		dispatch(getAllTaskInProjectApi(data.projectId));
	};
};
