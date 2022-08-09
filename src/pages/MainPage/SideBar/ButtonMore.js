import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { archiveUnarchiveProjectApi } from '../../../redux/actions/ProjectAction';

const styles = {
	cssMenuItem: {
		fontSize: '12px',
	},
	btnMore: {
		fontSize: '16px',
		color: '#a2a0a2',
		cursor: 'pointer',
		'&:hover': {
			color: '#ffff',
		},
	},
};

export default function ButtonMore(props) {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);

	const { project } = props;
	const checkArchive = project.archived;

	const handleClick = event => {
		setAnchorEl(event.target);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleArchive =async (status, projectId) => {
		
		await dispatch(archiveUnarchiveProjectApi(status, projectId));
		handleClose();
	};

	return (
		<div>
			<MoreHorizIcon
				
				aria-controls={open ? 'menu__project' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={styles.btnMore}
			/>

			<Menu id='menu__project' anchorEl={anchorEl} open={open} onClose={handleClose}>
				{checkArchive ? (
					<MenuItem
						sx={styles.cssMenuItem}
						onClick={() => {
							handleArchive(false, project._id);
						}}
					>
						Unarchive Project
					</MenuItem>
				) : (
					<MenuItem
						sx={styles.cssMenuItem}
						onClick={() => {
							handleArchive(true, project._id);
						}}
					>
						Archive Project
					</MenuItem>
				)}
			</Menu>
		</div>
	);
}
