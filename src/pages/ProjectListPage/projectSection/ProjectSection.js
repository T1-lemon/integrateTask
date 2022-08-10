import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Container, Draggable } from 'react-smooth-dnd';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProjectTask from '../projectTask/ProjectTask';
import './projectSection.css';
import { mapOrder } from '../../../utils/sort';
import ProjectSectionForm from './ProjectSectionForm';
import ProjectAddSectionForm from './ProjectAddSectionForm';
import { addSectionLeftRightAction } from '../../../redux/actions/ProjectAction';
import { addSectionLeftRightApi } from '../../../redux/actions/SectionAction';
import ProjectAddTaskForm from '../projectTask/ProjectAddTaskForm';
const styles = {
	textTitle: {
		cursor: 'pointer',
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	icon: {
		fontSize: '15px',
	},
	iconHover: {
		fontSize: '17px',
	},
	titleBlockAfterActive: {
		backgroundColor: '#fff',
	},
	titleBlockBeforeActive: {
		backgroundColor: '#fff',
		borderRadius: '10px',
		border: '1px solid grey',
	},
};

export default function ProjectSection(props) {
	const { section, indexSection, tasks, taskOrders, onTaskDrop } = props;
	const dispatch = useDispatch();

	const { sectionOrder, _id } = useSelector(
		state => state.ProjectReducer.currentProject
	);

	const [isExpand, setIsExpand] = useState(true);
	const [isAddTaskAbove, setIsAddTaskAbove] = useState(false);
	const [isAddTaskBelow, setIsAddTaskBelow] = useState(false);
	const [isAddSectionAbove, setAddSectionAbove] = useState(false);
	const [isAddSectionBelow, setAddSectionBelow] = useState(false);
	const [checkAboveBelow, setCheckAboveBelow] = useState();

	const taskInSection = tasks
		? tasks.filter(item => item.sectionId === section._id)
		: [];

	const taskOrderInSection = taskOrders
		? taskOrders.find(item => item.sectionId === section._id)
			? taskOrders.find(item => item.sectionId === section._id).taskOrder
			: []
		: [];

	const taskList =
		taskInSection && taskOrderInSection
			? mapOrder(taskInSection, taskOrderInSection, '_id')
			: [];

	const handleClickExpandButton = () => {
		setIsExpand(!isExpand);
	};

	const handleMouseDown = () => {
		setIsExpand(false);
	};

	const handleMouseUp = () => {
		setIsExpand(true);
	};

	const handleClickAddTaskBelow = () => {
		setIsAddTaskBelow(!isAddTaskBelow);
	};

	const handleClickAddTaskAbove = () => {
		setIsAddTaskAbove(!isAddTaskAbove);
		setIsExpand(true);
	};

	const handleAddSectionAbove = () => {
		setAddSectionAbove(true);
		setCheckAboveBelow(0);
	};

	const handleAddSectionBelow = async () => {
		setAddSectionBelow(true);
		setCheckAboveBelow(1);
	};

	const handleAddSectionSubmit = e => {
		const titleSection = e.target.value;

		const sectionNameInput = !titleSection.trim()
			? 'Untitled section'
			: titleSection;

		const newSection = {
			sectionName: sectionNameInput,
			taskOrder: [],
			projectId: _id,
		};

		let indexAddSection = indexSection + checkAboveBelow;

		console.log('indexAddSection', indexAddSection);
		dispatch(addSectionLeftRightApi(newSection, sectionOrder, indexAddSection));
		setAddSectionAbove(false);
		setAddSectionBelow(false);

		e.target.value = '';
	};

	return (
		<>
			<Grid container sx={{ width: '25%' }} className='title__container'>
				<ProjectAddSectionForm
					isDisplay={isAddSectionAbove}
					onSubmit={handleAddSectionSubmit}
				/>
				<ProjectSectionForm
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					isExpand={isExpand}
					onClickExpandButton={handleClickExpandButton}
					sectionId={section._id}
					sectionName={section.sectionName}
					onClickAddTaskAbove={handleClickAddTaskAbove}
					onClickAddSectionAbove={handleAddSectionAbove}
					onClickAddSectionBelow={handleAddSectionBelow}
				/>
			</Grid>
			<Box display={isAddTaskAbove ? 'block' : 'none'}>
					<ProjectAddTaskForm
						onClickAddTask={handleClickAddTaskAbove}
						taskOrderInSection={taskOrderInSection}
						taskOrderInProject={taskOrders}
						sectionId={section._id}
						projectId={section.projectId}
					/>
			</Box>
			<Box
				display={isExpand ? 'block' : 'none'}
				style={styles.titleBlockAfterActive}
				className='task__container'
			>
				<Box>
					<Container
						groupName='col'
						onDrop={dropResult => onTaskDrop(dropResult, section, taskList)}
						getChildPayload={index => taskList[index]}
						dragClass='opacity-ghost-x'
						dropClass='opacity-ghost-drop-x'
						dropPlaceholder={{
							animationDuration: 150,
							showOnTop: true,
							className: 'drop-preview',
						}}
						dropPlaceholderAnimationDuration={200}
						dragHandleSelector='.row-drag-handle'
					>
						{taskList.map(task => {
							return (
								<Draggable key={task._id}>
									<ProjectTask task={task} sectionId={section._id} />
								</Draggable>
							);
						})}
					</Container>
				</Box>
				<Box display={taskList.length === 0 ? 'none' : 'block'}>
					<Box display={isAddTaskBelow ? 'block' : 'none'}>
						<ProjectAddTaskForm
							onClickAddTask={handleClickAddTaskBelow}
							isAddTaskBelow={isAddTaskBelow}
							taskOrderInSection={taskOrderInSection}
							sectionId={section._id}
							projectId={section.projectId}
						/>
					</Box>
					<Box className='addTask__block--below' onClick={handleClickAddTaskBelow}>
						<Typography className='addTask__typography--below'>
							Add task...
						</Typography>
					</Box>
				</Box>
			</Box>
			<ProjectAddSectionForm
				isDisplay={isAddSectionBelow}
				onSubmit={handleAddSectionSubmit}
			/>
		</>
	);
}
