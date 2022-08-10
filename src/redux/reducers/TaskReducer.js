import {
	GET_ALL_TASK_IN_PROJECT,
	GET_ALL_TASK_ORDER_IN_PROJECT,
	UPDATE_DROP_TASK,
	UPDATE_TITLE_TASK,
	UPDATE_STATUS_TASK,
	UPDATE_TASK,
} from '../types/TaskTypes';

const initialState = {
	arrTask: [],
	taskOrders: [],
};

const TaskReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_TASK_IN_PROJECT:
			state.arrTask = action.dataTasks;
			return { ...state };

		case GET_ALL_TASK_ORDER_IN_PROJECT:
			state.taskOrders = action.taskOrderInProject;
			return { ...state };

		case UPDATE_DROP_TASK: {
			const taskDrag = state.arrTask.find(
				task => task._id === action.taskDrag._id
			);
			taskDrag.sectionId = action.sectionIdDrop;

			const taskOrderDrag = state.taskOrders.find(
				section => section.sectionId === action.sectionIdDrop
			);
			taskOrderDrag.taskOrder = action.newTaskOrder;

			state.taskOrders = [...state.taskOrders];
			state.arrTask = [...state.arrTask];

			return { ...state };
		}

		case UPDATE_TITLE_TASK: {
			let indexUpdateTitle = state.arrTask.findIndex(
				task => task._id === action.dataTasks._id
			);
			state.arrTask[indexUpdateTitle] = action.dataTasks;
			state.arrTask = [...state.arrTask];
			return { ...state };
		}

		case UPDATE_STATUS_TASK: {
			let indexUpdateStatus = state.arrTask.findIndex(
				task => task._id === action.dataTasks._id
			);
			state.arrTask[indexUpdateStatus] = action.dataTasks;
			state.arrTask = [...state.arrTask];
			return { ...state };
		}

		case UPDATE_TASK: {
			let indexUpdateTask = state.arrTask.findIndex(
				task => task._id === action.dataTasks.taskId
			);
			state.arrTask[indexUpdateTask] = action.dataTasks;
			state.arrTask = [...state.arrTask];
			return { ...state };
		}
		default:
			return { ...state };
	}
};

export default TaskReducer;
