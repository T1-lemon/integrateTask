import React from 'react';
import {
	Box,
	Checkbox,
	ClickAwayListener,
	Grid,
	Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Drawer from '@mui/material/Drawer';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './projectTask.css';
import AvatarAssignee from '../../../components/assignee/AvatarAssignee';
import AssigneeForm from '../../../components/assignee/AssigneeForm';
import MenuStatus from '../priority/MenuStatus';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import DueDateForm from '../../../components/duedate/DueDateForm';
import TaskDetail from '../TaskDetail/TaskDetail';
import {
	assignTaskApi,
	completeTaskApi,
	updatePriorityTaskApi,
	updateTitleTaskApi,
} from '../../../redux/actions/TaskAction';
import { showDate } from '../../../utils/date';
import { priorityArr, priorityMenu } from '../../../utils/priorityStatus';

const styles = {
	task: {
		border: '1px solid #CFCBCB',
		borderLeft: 'none',
		fontSize: '14px',
	},
	icon: {
		fontSize: '15px',
	},
	menu: {
		display: 'flex',
		justifyContent: 'space',
	},
};

const convertNumber = (arr, value) => {
	const arrCopy = [...arr];
	return arrCopy.indexOf(value);
};

const splitDate = date => {
	const cloneDate = date;
	return cloneDate.slice(0, 10);
};

export default function ProjectTask(props) {
	const { task, sectionId } = props;
	const {
		_id,
		taskStatus,
		taskName,
		assigneTo,
		startDate,
		dueDate,
		createdBy,
		priorityValue,
	} = task;

	const dispatch = useDispatch();
	const splitStartDate = startDate ? splitDate(startDate) : '';
	const splitDueDate = dueDate ? splitDate(dueDate) : '';
	const createdByName = createdBy ? createdBy.username : '';
	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);
	const membersWorkspace =
		currentWorkSpace && currentWorkSpace.members ? currentWorkSpace.members : [];
	const username = assigneTo !== null ? assigneTo.username : '';

	const [stateTaskName, setStateTaskName] = useState(taskName);
	const [dropDueDate, setDropDueDate] = useState(false);

	const [dropPriority, setDropPriority] = useState(true);

	const [dropAssignee, setDropAssignee] = useState(false);

	const [isChecked, setIsChecked] = useState(taskStatus);
	const [state, setState] = useState({
		right: false,
	});

	const taskTitleInput = useRef(null);
	const toggleDrawer = () => event => {
		setState({ ...state, right: !state.right });
	};

	const handelChangeCheckedStatus = e => {
		setIsChecked(e.target.checked);
		dispatch(completeTaskApi(_id));
	};

	const handlePressKeyTitleTask = value => {
		if (value.key === 'Enter') {
			value.target.blur();
		}
	};

	const handleEditTitleTask = e => {
		const titleTask = e.target.value;
		const titleTaskEdit = !titleTask.trim() ? 'Untitled task' : titleTask;
		dispatch(updateTitleTaskApi(_id, titleTaskEdit));

		e.target.value = titleTaskEdit
	};	

	const handleChangeTitleTask = e => {
		const titleTask = e.target.value;
		const titleTaskEdit = !titleTask.trim() ? 'Untitled task' : titleTask;
		setStateTaskName(titleTaskEdit)
	}

	const handleDropAssignee = () => {
		setDropAssignee(!dropAssignee);
	};

	const handleClickAwayAssignee = () => {
		setDropAssignee(false);
	};

	const handleClickAssignee = member => {
		const taskUpdate = {
			...task,
			assigneTo: {
				...task.assigneTo,
				username: member.username,
				email: member.email,
			},
		};

		setDropAssignee(false);
		dispatch(assignTaskApi(taskUpdate));
	};

	const handelDropDueDate = () => {
		setDropDueDate(!dropDueDate);
	};

	const handleClickAwayDueDate = () => {
		setDropDueDate(false);
	};

	const handleDropPriority = () => {
		setDropPriority(!dropPriority);
	};

	const handleClickPriority = e => {
		const numberStatus = convertNumber(
			priorityArr,
			e.target.outerText.toLowerCase()
		);
		setDropPriority(true);
		const taskUpdate = {
			...task,
			priorityValue: numberStatus.toString(),
		};
		dispatch(updatePriorityTaskApi(taskUpdate));
	};

	return (
		<Grid container className='taskName__container'>
			<Grid item xs={4} style={styles.task} className='taskName__block'>
				<Box className='taskName__block--input'>
					<Box className='row-drag-handle'>
						<ButtonProjectList
							icon={<DragIndicatorSharpIcon style={styles.icon} />}
							id='title__icon--hover'
						/>
					</Box>
					<Checkbox
						label='CheckCircleOutlineIcon'
						icon={<CheckCircleOutlineIcon sx={{ width: '18px' }} />}
						checkedIcon={<CheckCircleIcon sx={{ color: '#008000', width: '18px' }} />}
						inputProps={{ 'aria-label': 'controlled' }}
						sx={{
							zIndex: '2',
							'&:hover': { color: '#008000 !important' },
							px: 0,
							py: 0,
							mr: 1,
						}}
						checked={isChecked}
						onClick={handelChangeCheckedStatus}
					/>
					<input
						type='text'
						// defaultValue={stateTaskName}
						value={stateTaskName}
						className='taskName__input'
						onKeyPress={handlePressKeyTitleTask}
						onBlur={handleEditTitleTask}
						ref={taskTitleInput}
						onChange={handleChangeTitleTask}
					/>
					<Box className='css__focus'></Box>
				</Box>
				<React.Fragment>
					<Box className='taskName__button--viewDetails' onClick={toggleDrawer()}>
						<Typography className='taskName__typography--viewDetails'>
							Details
						</Typography>
						<ArrowForwardIosIcon className='taskName__icon--viewDetails' />
					</Box>
					<Drawer
						anchor={'right'}
						open={state['right']}
						onClose={toggleDrawer()}
						className='taskDetails__form--block'
					>
						<TaskDetail
							onClickButton={toggleDrawer()}
							onEditTitleTask={handleEditTitleTask}
							onPressKeyTitleTask={handlePressKeyTitleTask}
							onChangeTitleTask={handleChangeTitleTask}
							onClickAssignee={handleClickAssignee}
							task={task}
						/>
					</Drawer>
				</React.Fragment>
			</Grid>

			<ClickAwayListener onClickAway={handleClickAwayAssignee}>
				<Grid
					item
					xs={2}
					style={{ ...styles.task, position: 'relative' }}
					className='dropMenu--assignee'
				>
					<>
						<Box
							onClick={handleDropAssignee}
							className='dropItem__block--assigneeshow'
						>
							{username ? (
								<Box className='assignee__box--show'>
									<AvatarAssignee assignee={username} />
									<Typography className='assignee__typo--show'>{username}</Typography>
								</Box>
							) : (
								<AccountBoxIcon className='dropItem__avatar--assigneeshow' />
							)}
						</Box>
						<Box>
							<AssigneeForm
								memberArr={membersWorkspace}
								onClickAssignee={handleClickAssignee}
								isDrop={dropAssignee}
							/>
						</Box>
					</>
				</Grid>
			</ClickAwayListener>

			<ClickAwayListener onClickAway={handleClickAwayDueDate}>
				<Grid
					item
					xs={2}
					align='right'
					style={styles.task}
					className='dueDate__calendar'
				>
					<Box onClick={handelDropDueDate} className='dueDate__block--show'>
						{splitStartDate || splitDueDate ? (
							<Typography className='dueDate__typography--show'>
								{showDate(splitStartDate, splitDueDate)}
							</Typography>
						) : (
							<CalendarTodayIcon className='dueDate__icon--show' />
						)}
					</Box>
					<DueDateForm
						dropDueDate={dropDueDate}
						startDate={splitStartDate}
						dueDate={splitDueDate}
						task={task}
						handleClickAwayDueDate={handleClickAwayDueDate}
					/>
				</Grid>
			</ClickAwayListener>

			<Grid item xs={2} align='right' style={{ ...styles.task, padding: '10px' }}>
				{createdByName}
			</Grid>
			<Grid
				item
				xs={2}
				style={{ ...styles.task, borderRight: 'none' }}
				className='dropMenu--priority'
			>
				<MenuStatus
					onDrop={handleDropPriority}
					drop={dropPriority}
					status={priorityValue}
					statusArr={priorityArr}
					menu={priorityMenu}
					onClickStatus={handleClickPriority}
				/>
			</Grid>
		</Grid>
	);
}
