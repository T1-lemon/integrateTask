import { weekday, months, monthAbbreviate } from '../constants/constants';

export const getDate = () => {
	const today = new Date();

	let dayOfWeek = weekday[today.getDay()];

	let curMonth = months[today.getMonth()];
	let dayOfMonth = today.getDate();

	let textToday = `${dayOfWeek}, ${curMonth} ${dayOfMonth}`;
	return textToday;
};

export const showDateInDateInput = value => {
	if (value) {
		const day = value.slice(8, 10);
		const month = value.slice(4, 7);
		const year = value.slice(11,15);
		const newMonth = monthAbbreviate.indexOf(month).toString();
		const date = `${year}-0${newMonth}-${day}`;
		return date;
	}
	return '';
};

export const convertDateFromDataBase = value => {
	const date = value.slice(0, 10);
	return date;
};

export const convertDateToValue = value => {
	if (value) {
		const day = value.slice(8, 10);
		const month = value.slice(6, 7);
		const newDate = `${monthAbbreviate[month]} ${day}`;
		return newDate;
	}
	return '';
};

export const showDate = (startDate, dueDate) => {
	if (startDate || dueDate) {
		const valueStartDate = convertDateToValue(startDate);
		const valueDueDate = convertDateToValue(dueDate);

		const date = `${valueStartDate} - ${valueDueDate}`;
		return date;
	}
	return '';
};
