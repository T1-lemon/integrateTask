import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	MODAL_ACTION_CLOSE,
	MODAL_ACTION_CONFIRM,
} from '../../../constants/constants';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';

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

export default function ProjectAddSectionForm(props) {
	const { isDisplay, onSubmit } = props;

	let inputAddSectionRef = useRef(null);

	const formAddSectionRef = useRef(null);

	useEffect(() => {
		if (isDisplay && inputAddSectionRef && inputAddSectionRef.current) {
			inputAddSectionRef.current.focus();
		}
	}, [isDisplay]);
	
	const handleKeyPress = value => {
		if (value.key === 'Enter') {
			value.target.blur();
		}
	};

	return (
		<Grid
			item
			className='title__content '
			display={isDisplay ? 'flex' : 'none'}
			ref={formAddSectionRef}
		>
			<Box>
				<ButtonProjectList
					icon={<DragIndicatorSharpIcon style={styles.icon} />}
					id='title__icon--hover'
				/>
			</Box>
			<ButtonProjectList
				icon={<ExpandMoreIcon style={styles.icon} />}
				id='title_button--expand'
			/>
			<TextField
				onBlur={onSubmit}
				sx={{
					width: '175px',
					'& .MuiOutlinedInput-root:hover': {
						'& > fieldset': {
							borderColor: 'gray',
						},
					},
					'& .MuiOutlinedInput-root.Mui-focused': {
						'& > fieldset': {
							borderColor: '#0057B7',
						},
					},
					'& .MuiOutlinedInput-root': {
						'& > fieldset': {
							borderColor: 'white',
							borderRadius: '10px',
						},
					},
					'&': {
						input: {
							padding: '10px',
							fontWeight: 'bold',
							fontSize: '15px',
						},
					},
					borderColor: 'white',
				}}
				placeholder={'Write a section name'}
				className='Box__input--addTask'
				onKeyPress={handleKeyPress}
				inputRef={inputAddSectionRef}
			/>
			<Box sx={{ position: 'relative' }}>
				<ButtonProjectList
					icon={<AddIcon style={styles.icon} />}
					id='title__button--addTask'
				/>
			</Box>
			<Box sx={{ position: 'relative' }}>
				<ButtonProjectList
					icon={<MoreHorizIcon style={styles.icon} />}
					id='title__button--showMore'
				/>
			</Box>
		</Grid>
	);
}
