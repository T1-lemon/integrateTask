import { Avatar, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import './assigneeForm.css';
export default function AssigneeForm(props) {
	const { memberArr, onClickAssignee, isDrop } = props;
	return (
		<Box
			className='dropItem__block--assigneehidden'
			display={isDrop ? 'none' : 'block'}
		>
			<Box item xs={6} className='col--assignee'>
				{memberArr.map((value, index) => {
					return (
						<Box
							sx={{ display: 'flex' }}
							className='col__block--content'
							key={index}
							onClick={() => onClickAssignee(value)}
						>
							<Box>
								<Avatar sx={{ bgcolor: '#F1BD6C' }} className='col__avatar'>
									{`${value.slice(0, 1).toUpperCase()}${value.slice(1, 2)}`}
								</Avatar>
							</Box>
							<Box className='col__block--typography'>
								<Typography className='col__typography col__typo--userName'>
									{`${value.slice(0, 1).toUpperCase()}${value.slice(1, 4)}`}
								</Typography>
								<Typography className='col__typography col_typo--email'>
									{value}
								</Typography>
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
