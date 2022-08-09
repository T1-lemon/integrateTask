import { weekday, months } from '../constants/constants';

export const getDate = () => {
	const today = new Date();

	let dayOfWeek = weekday[today.getDay()];

	let curMonth = months[today.getMonth()];
	let dayOfMonth = today.getDate();

	let textToday = `${dayOfWeek}, ${curMonth} ${dayOfMonth}`;
	return textToday;
};
