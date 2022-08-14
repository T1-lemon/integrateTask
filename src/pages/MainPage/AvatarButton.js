import React from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../MainPage/avatarButton.css';
import { toggleFormWorkspace } from '../../redux/actions/toggleAction';
import * as workspaceService from '../../services/workspaceService';
import * as storage from '../../utils/storage';
import { logout } from '../../services/LoginService';
import { ProgressListener } from '../../components/ProgressTest/Progress';

let workspace = [];

export default function AvatarButton() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = storage.getValueStorage('auth');
	useEffect(() => {
		const fetchGetAllWorkspaceApi = async () => {
			const userEmail = currentUser.email;
			const result = await workspaceService.getAllWorkspaceByUserEmail(userEmail);
			workspace = [...result.data];
		};

		fetchGetAllWorkspaceApi();
	}, []);

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenFormWorkspace = () => {
		setAnchorElUser(null);
		dispatch(toggleFormWorkspace(true));
	};

	const handleLogOut = async () => {
		handleCloseUserMenu();
		const userId = currentUser._id;
		ProgressListener.emit('start');
		await logout(userId);
		ProgressListener.emit('stop');
		navigate('/');
		storage.deleteValueStorage('auth');
	};

	return (
		<div>
			<Tooltip title='Open settings'>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar>
						{currentUser.username
							? `${currentUser.username
									.slice(0, 1)
									.toUpperCase()}${currentUser.username.slice(1, 2)}`
							: `${currentUser.userName
									.slice(0, 1)
									.toUpperCase()}${currentUser.userName.slice(1, 2)}`}
					</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id='menu-appbar'
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<Box className='avatar__menu'>
					<Box className='avatar__list--workspace'>
						{workspace.map(item => {
							return (
								<ListItem
									key={item._id}
									component='div'
									disablePadding
									onClick={handleCloseUserMenu}
									className='list__item--workspace'
								>
									<Link
										className='list__link'
										to={{ pathname: `/main-page/home/${item._id}` }}
										target='_blank'
									>
										<ListItemButton>
											<ListItemText className='list__button'>
												{`${item.workspaceName}`}
											</ListItemText>
										</ListItemButton>
									</Link>
								</ListItem>
							);
						})}
					</Box>
					<MenuItem onClick={handleOpenFormWorkspace}>
						<Typography className='item__typography--createwsp'>
							Create new workspace
						</Typography>
					</MenuItem>
					<MenuItem onClick={handleLogOut}>
						<Typography className='item__typography--logout'>Logout</Typography>
					</MenuItem>
				</Box>
			</Menu>
		</div>
	);
}
