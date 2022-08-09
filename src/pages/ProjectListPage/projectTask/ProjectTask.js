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
import { useState } from 'react';

import './projectTask.css';
import AvatarAssignee from '../assignee/AvatarAssignee';
import AssigneeForm from '../assignee/AssigneeForm';
import MenuStatus from '../priority/MenuStatus';
import ButtonProjectList from '../utils/ButtonProjectList';
import DueDateForm from '../duedate/DueDateForm';
import TaskDetail from '../TaskDetail/TaskDetail';

const styles = {
	task: {
		border: '1px solid #CFCBCB',
		borderLeft: 'none',
		fontSize: '13px',
	},
	icon: {
		fontSize: '15px',
	},
	menu: {
		display: 'flex',
		justifyContent: 'space',
	},
};
const MembersWorkspace = [
	'toan211@gmail.com',
	'ly@gmail.com',
	'hoang@gmai.com',
];

const priorityArr = ['none', 'high', 'medium', 'low'];

const priorityMenu = [
	{
		nameClass: 'dropItem__typography dropItem__typography--none',
		text: 'none',
	},
	{
		nameClass: 'dropItem__typography dropItem__typography--high',
		text: 'high',
	},
	{
		nameClass: 'dropItem__typography dropItem__typography--medium',
		text: 'medium',
	},
	{
		nameClass: 'dropItem__typography dropItem__typography--low',
		text: 'low',
	},
];

const convertNumber = (arr, value) => {
	const arrCopy = [...arr];
	return arrCopy.indexOf(value);
};

const splitDate = (date) => {
	const cloneDate = date
	cloneDate.splice()
}
export default function ProjectTask(props) {
	const { task } = props;
	const {
		taskStatus,
		taskName,
		assigneTo,
		startDate,
		dueDate,
		createdBy,
		priorityValue,
	} = task;

	console.log('start date', startDate)
	console.log('due date', dueDate)
	const [startDateCalendar, setStartDateCalendar] = useState('');
	const [dueDateCalendar, setDueDateCalendar] = useState('');
	const [isFocusDueDate, setIsFocusDueDate] = useState(true);

	const [dropDueDate, setDropDueDate] = useState(true);

	const [dropPriority, setDropPriority] = useState(true);
	const [priority, setPriority] = useState(task.priority);

	const [dropAssignee, setDropAssignee] = useState(true);

	const [assignee, setAssignee] = useState(task.assigne_to);

	const [isChecked, setIsChecked] = useState(task.status);
	const [state, setState] = useState({
		right: false,
	});
	const toggleDrawer = () => event => {
		setState({ ...state, right: !state.right });
	};

	const handleDropPriority = () => {
		setDropPriority(!dropPriority);
	};

	const handleClickPriority = e => {
		const numberStatus = convertNumber(
			priorityArr,
			e.target.outerText.toLowerCase()
		);
		setPriority(numberStatus.toString());
		setDropPriority(true);
	};

	const handleDropAssignee = () => {
		setDropAssignee(!dropAssignee);
	};

	const handleClickAwayAssignee = () => {
		setDropAssignee(true);
	};

	const handleClickAssignee = value => {
		setAssignee(value);
		setDropAssignee(true);
	};

	const handelChangeCheckedStatus = e => {
		setIsChecked(e.target.checked);
	};

	const handelDropDueDate = () => {
		setDropDueDate(!dropDueDate);
	};

	const showDueDate = (startDate, dueDate) => {
		console.log(startDate);
		if (startDate || dueDate) {
			const valueStartDate = startDate.slice(4, 10);
			const valueDueDate = dueDate.slice(4, 10);
			const date = `${valueStartDate} - ${valueDueDate}`;
			return date;
		}
		return '';
	};

	const handleClickStartDate = () => {
		setIsFocusDueDate(true);
	};

	const handleClickDueDate = () => {
		setIsFocusDueDate(false);
	};

	const handleChangeDueDate = value => {
		const newDueDate = value.toString().slice(0, 15);
		console.log(newDueDate);
		if (isFocusDueDate) {
			setStartDateCalendar(newDueDate);
			setIsFocusDueDate(false);
			return;
		}
		setDueDateCalendar(newDueDate);
		setIsFocusDueDate(true);
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
						checkedIcon={<CheckCircleIcon sx={{ color: '#368E6A', width: '18px' }} />}
						inputProps={{ 'aria-label': 'controlled' }}
						sx={{
							zIndex: '2',
							'&:hover': { color: '#368E6A !important' },
							px: 0,
							py: 0,
							mr: 1,
						}}
						checked={isChecked}
						onClick={handelChangeCheckedStatus}
					/>
					<input type='text' defaultValue={taskName} className='taskName__input' />
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
						<TaskDetail onClickButton={toggleDrawer()} task={task} />
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
							{assignee ? (
								<AvatarAssignee assignee={assignee} />
							) : (
								<AccountBoxIcon className='dropItem__avatar--assigneeshow' />
							)}
						</Box>
						<Box>
							<AssigneeForm
								memberArr={MembersWorkspace}
								onClickAssignee={handleClickAssignee}
								isDrop={dropAssignee}
							/>
						</Box>
					</>
				</Grid>
			</ClickAwayListener>

			<Grid
				item
				xs={2}
				align='right'
				style={styles.task}
				className='dueDate__calendar'
			>
				<Box onClick={handelDropDueDate} className='dueDate__block--show'>
					{startDateCalendar || dueDateCalendar ? (
						<Typography className='dueDate__typography--show'>
							{showDueDate(startDateCalendar, dueDateCalendar)}
						</Typography>
					) : (
						<CalendarTodayIcon className='dueDate__icon--show' />
					)}
				</Box>
				<DueDateForm
					dropDueDate={dropDueDate}
					startDate={startDateCalendar}
					dueDate={dueDateCalendar}
					isFocusDueDate={isFocusDueDate}
					onClickStartDate={handleClickStartDate}
					onClickDueDate={handleClickDueDate}
					onChangeDueDate={handleChangeDueDate}
				/>
			</Grid>
			<Grid item xs={2} align='right' style={{ ...styles.task, padding: '10px' }}>
				{task.created_by}
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
					status={priority}
					statusArr={priorityArr}
					menu={priorityMenu}
					onClickStatus={handleClickPriority}
				/>
			</Grid>
		</Grid>
	);
}
