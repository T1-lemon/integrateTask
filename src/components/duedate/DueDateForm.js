import React, { useState, useRef } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import './dueDateForm.css';
import { convertDateFromDataBase, showDateInDateInput } from '../../utils/date';
import ButtonProjectList from '../../components/ButtonProjectList/ButtonProjectList';
import { setDateTaskApi } from '../../redux/actions/TaskAction';

export default function DueDateForm(props) {
	const { dropDueDate, startDate, dueDate, task,handleClickAwayDueDate } = props;

	const dispatch = useDispatch();

	const [isFocusDueDate, setIsFocusDueDate] = useState(true);

	const [startDateCalendar, setStartDateCalendar] = useState(
		convertDateFromDataBase(startDate)
	);
	const [dueDateCalendar, setDueDateCalendar] = useState(
		convertDateFromDataBase(dueDate)
	);

	const handleClickStartDate = () => {
		setIsFocusDueDate(true);
	};

	const handleClickDueDate = () => {
		setIsFocusDueDate(false);
	};

	const handleChangeDueDate = value => {
		const newDueDate = showDateInDateInput(value.toString().slice(0, 15));

		if (isFocusDueDate) {
			setStartDateCalendar(newDueDate);
			setIsFocusDueDate(false);
			return;
		}
		setDueDateCalendar(newDueDate);
		setIsFocusDueDate(true);
	};

	const handleClickClearAll = () => {
		setStartDateCalendar('');
		setDueDateCalendar('');
	};

	const handleSubmitDate = () => {
		const taskUpdate = {
			...task,
			startDate: startDateCalendar,
			dueDate: dueDateCalendar,
		};
		handleClickAwayDueDate();
		dispatch(setDateTaskApi(taskUpdate));
	};

	return (
		<Box display={dropDueDate ? 'flex' : 'none'} className='dueDate__block'>
			<Box className='header__block--input'>
				<TextField
					onClick={handleClickStartDate}
					placeholder={'Start date'}
					className='header__input'
					value={startDateCalendar}
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
					onClick={handleClickDueDate}
					placeholder={'Due date'}
					className='header__input'
					value={dueDateCalendar}
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
				<CalendarPicker onChange={handleChangeDueDate} />
			</LocalizationProvider>
			<Box className='footer__block'>
				<ButtonProjectList
					text='Clear'
					id='footer__button--clearAll'
					onClickButton={handleClickClearAll}
				/>
				<ButtonProjectList
					text='Submit'
					id='footer__button--submit'
					onClickButton={handleSubmitDate}
				/>
			</Box>
		</Box>
	);
}
