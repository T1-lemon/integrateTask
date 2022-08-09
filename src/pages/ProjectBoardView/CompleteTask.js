import React from 'react';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TooltipCustomize } from '../../components/ToolTip/ToolTip';

export default function CompleteTask(props) {
	const { task } = props;
	return (
		<Box className='box__complete-task'>
			{task.status ? (
				<TooltipCustomize title='Mark task incomplete' placement='bottom'>
					<CheckCircleIcon className='icon__checkCircle icon__complete' />
				</TooltipCustomize>
			) : (
				<TooltipCustomize title='Mark task complete' placement='bottom'>
					<CheckCircleOutlineIcon className='icon__checkCircle icon__incomplete' />
				</TooltipCustomize>
			)}
		</Box>
	);
}
