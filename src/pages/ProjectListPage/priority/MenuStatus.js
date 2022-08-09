import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import DisplayStatus from './DisplayStatus';

const styles = {
	icon: {
		fontSize: '15px',
    },
};

export default function MenuStatus(props) {
    const {onDrop, drop, status, statusArr , menu, onClickStatus} = props;

	return (
		<>
			<Grid
				container
				onClick={onDrop}
				className='dropItem__block dropItem__block--show'
			>
				<Grid item xs={10}>
					<DisplayStatus status={status} arr={statusArr} />
				</Grid>
				<Grid item xs={2}>
					<ExpandMoreIcon style={styles.icon} />
				</Grid>
			</Grid>
			<Box
				className='dropItem__block--hidden'
				display={drop ? 'none' : 'block'}
			>
				{menu.map((value, index) => {
					return (
						<Box
							container
							className='dropItem__block'
							onClick={onClickStatus}
							key={index}
						>
							{index === status ? <CheckIcon style={{ ...styles.icon, marginLeft: '10px' }} /> : <HorizontalRuleIcon style={{ ...styles.icon, marginLeft: '10px' }} />}
							<Typography className={`${value.nameClass}`}>{value.text}</Typography>
						</Box>
					);
				})}
			</Box>
		</>
	);
}
