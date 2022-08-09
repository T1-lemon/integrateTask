import { getAllTaskInProjectService } from '../../services/taskService';
import {
	GET_ALL_TASK_IN_PROJECT,
	GET_ALL_TASK_ORDER_IN_PROJECT,
    UPDATE_DROP_TASK,
} from '../types/TaskTypes';

export const getAllTaskInProjectApi = projectId => {
	return async dispatch => {
		const { data } = await getAllTaskInProjectService(projectId);

		console.log(data)
		dispatch({
			type: GET_ALL_TASK_IN_PROJECT,
			dataTasks: data,
		});
	};
};

export const getAllTaskOrderAction = taskOrderInProject => {
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