import React from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';

import './projectHeader.css';
import ButtonProjectList from '../utils/ButtonProjectList';

export default function ProjectHeader() {
	const [dropFilter, setDropFilter] = useState(false);
	const [filterStatus, setFilterSatus] = useState('All Task');
	const [state, setState] = useState({
		right: false,
	});

	const toggleDrawer = () => event => {
		setState({ ...state, right: !state.right });
	};

	const handleClickButtonFilter = () => {
		setDropFilter(!dropFilter);
	};

	const handleClickButtonFilterItem = e => {
		setFilterSatus(e.target.innerText);
		setDropFilter(!dropFilter);
	};

	const filterTask = [
		{
			text: 'all task',
			id: 'filterTask__button--allTask',
			handleClick: handleClickButtonFilterItem,
		},
		{
			text: 'imcomplete task',
			id: 'filterTask__button',
			handleClick: handleClickButtonFilterItem,
		},
		{
			text: 'completed task',
			id: 'filterTask__button--completedTask',
			handleClick: handleClickButtonFilterItem,
		},
	];

	return (
		<>
			<Grid container>
				<Grid item xs={9}></Grid>
				<Grid item xs={2} sx={{ position: 'relative' }}>
					<Box>
						<ButtonProjectList
							icon={<CheckCircleOutlineIcon sx={{ fontSize: '15px' }} />}
							text={filterStatus}
							id='filterTask__button--show'
							onClickButton={handleClickButtonFilter}
						></ButtonProjectList>
					</Box>
					<Box
						display={dropFilter ? 'block' : 'none'}
						id='filterTask__block'
						sx={{ zIndex: '1' }}
					>
						{filterTask.map((item, index) => {
							return (
								<ButtonProjectList
									text={item.text}
									id={item.id}
									onClickButton={item.handleClick}
									key={index}
								></ButtonProjectList>
							);
						})}
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
