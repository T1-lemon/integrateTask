import React from 'react';
import {
	Box,
	ClickAwayListener,
	Grid,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';

import '../TaskDetail/taskDetail.css';
import ButtonProjectList from '../utils/ButtonProjectList';
import MenuStatus from '../priority/MenuStatus';

const styles = {
	icon: {
		fontSize: '13px',
	},
};

export default function TaskDetail(props) {
	const { onClickButton, task } = props;
	const [dropAssignee, setDropAssignee] = useState(false);

	const handleClickAwayAssignee = () => {
		setDropAssignee(false);
	};
	return (
		<Box role='presentation' className='taskDetail__box--container'>
			<Box className='taskDetail__box--header'>
				<ButtonProjectList
					text='mark complete'
					icon={<DoneIcon style={styles.icon} />}
					id='taskDetail__icon--header'
				/>
				<Button onClick={onClickButton}>
					<ChevronRightIcon sx={{ color: '#0F0F10' }} />
				</Button>
			</Box>
			<Divider />
			<TextField
				sx={{
					width: '100%',
					'& .MuiOutlinedInput-root.Mui-focused': {
						'& > fieldset': {
							borderColor: '#0057B7',
						},
					},
				}}
				placeholder={'Write a section name'}
				className='taskDetail__input--taskName'
				defaultValue={task.task_name}
			/>
			<Box className='taskDetail__box--body'>
				<ClickAwayListener onClickAway={handleClickAwayAssignee}>
					<Box className='taskDetail__box--content taskDetail__box--assignee'>
						<Typography className='taskDetail__typo taskDetail__typo--assignee'>
							Assignee
						</Typography>
						<Box>
							<Box className='taskDetail__box--form taskDetail__box--noAssignee'>
								<PermIdentityIcon className='taskDetail__icon taskDetail__icon--assignee' />
								<Typography className='taskDetail__typo taskDetail__typo--assignee'>
									No assignee
								</Typography>
							</Box>
							<Box></Box>
						</Box>
					</Box>
				</ClickAwayListener>
				<ClickAwayListener>
					<Box className='taskDetail__box--content taskDetail__box--dueDate'>
						<Typography className='taskDetail__typo taskDetail__typo--dueDate'>
							Due date
						</Typography>
						<Box>
							<Box className='taskDetail__box--form taskDetail__box--noDueDate'>
								<CalendarTodayIcon className='taskDetail__icon taskDetail__icon--dueDate' />
								<Typography className='taskDetail__typo taskDetail__typo--dueDate'>
									No due date
								</Typography>
							</Box>
							<Box></Box>
						</Box>
					</Box>
				</ClickAwayListener>
				<Box className='taskDetail__box--content taskDetail__box--createdOn'>
					<Typography className='taskDetail__typo'>Created on</Typography>
					<Box className='taskDetail__box--form'>
						<Typography className='taskDetail__typo'>tuan@gmail.com</Typography>
					</Box>
				</Box>
				<ClickAwayListener>
					<Box className='taskDetail__box--content taskDetail__box--dueDate'>
						<Typography className='taskDetail__typo taskDetail__typo--dueDate'>
							Priority
						</Typography>
						<Box></Box>
					</Box>
				</ClickAwayListener>
				<Box className='taskDetail__box--content taskDetail__box--description'>
					<Box className='taskDetail__box--typo'>
						<Typography className='taskDetail__typo'>Description</Typography>{' '}
					</Box>
					<Box sx={{ width: '100%' }}>
						<TextareaAutosize
							maxRows={4}
							aria-label='maximum height'
							placeholder='Add text description'
							style={{ width: '100%'}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}