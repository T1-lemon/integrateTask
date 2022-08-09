import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { Box, TextField } from '@mui/material';

import './dueDateForm.css';
import ButtonProjectList from '../utils/ButtonProjectList';

export default function DueDateForm(props) {
	const {
		dropDueDate,
		startDate,
		dueDate,
		isFocusDueDate,
		onClickStartDate,
		onClickDueDate,
		onChangeDueDate,
	} = props;

	const convertValueToDate = value => {
		if (value) {
			const day = value.slice(8, 10);
			const month = value.slice(4, 7);
			const year = value.slice(11);
			const monthArr =['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			const newMonth = monthArr.indexOf(month).toString();
			const date = `${day}/${newMonth}/${year}`;
			return date;
		} 
		return ''
	};

	return (
		<Box display={dropDueDate ? 'none' : 'flex'} className='dueDate__block'>
			<Box className='header__block--input'>
				<TextField
					onClick={onClickStartDate}
					placeholder={'Start date'}
					className='header__input'
					value={convertValueToDate(startDate)}
					InputProps={{
						readOnly: true,
					}}
					inputRef={input => {
						if (isFocusDueDate) {
							return input && input.focus();
						}
						return '';
					}}
				/>
				<TextField
					onClick={onClickDueDate}
					placeholder={'Due date'}
					className='header__input'
					value={convertValueToDate(dueDate)}
					InputProps={{
						readOnly: true,
					}}
					inputRef={input => {
						if (!isFocusDueDate) {
							return input && input.focus();
						}
						return '';
					}}
				/>
			</Box>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<CalendarPicker onChange={onChangeDueDate} />
			</LocalizationProvider>
			<Box className='footer__block'>
				<ButtonProjectList
					text='Clear'
					id='footer__button--clearAll'
					// onClickButton={handleClickClearAll}
				/>
				<ButtonProjectList
					text='Submit'
					id='footer__button--submit'
					// onClickButton={handleClickSubmit}
				/>
			</Box>
		</Box>
	);
}
