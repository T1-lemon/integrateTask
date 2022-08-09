import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet } from 'react-router-dom';
import { Main } from '../../components/Main/Main';
import { AppBar } from '../../components/AppBar/AppBar';
import { Box } from '@mui/system';
import { useRoutes } from 'react-router-dom';
import HomeToolbar from './Toolbar/HomeToolbar';
import MytaskToolbar from './Toolbar/MytaskToolbar';
import ProjectToolbar from './Toolbar/ProjectToolbar';
import { useSelector, useDispatch } from 'react-redux';
import { URLS } from '../../routes/routesAsana';
import { generatePath } from 'react-router-dom';

import AvatarButton from '../MainPage/AvatarButton';

export default function Content(props) {
	const currentWorkSpace = useSelector(
		state => state.WorkspaceReducer.currentWorkSpace
	);

	const currentProject = useSelector(
		state => state.ProjectReducer.currentProject
	);

	// console.log(currentProject);

	const { open, setOpen, drawerWidth } = props;

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const [entityPath, setEntityPath] = useState('list');

	const getEntityPath = checkListBoard => {
		setEntityPath(checkListBoard);
	};

	let pathWorkspace = '';
	let pathProject = '';

	if (currentWorkSpace && currentWorkSpace.workspace_id) {
		pathWorkspace = generatePath(URLS.workspace, {
			workspaceId: currentWorkSpace.workspace_id,
		});
	}

	if (currentProject && currentProject._id) {
		pathProject = generatePath(':projectId/:entity', {
			projectId: currentProject._id,
			entity: entityPath,
		});
	}

	const elementToolbar = useRoutes([
		{
			path: pathWorkspace,
			element: <HomeToolbar />,
		},
		{ path: URLS.myTask, element: <MytaskToolbar /> },
		{
			path: pathProject,
			element: <ProjectToolbar getEntityPath={getEntityPath} />,
		},
	]);

	return (
		<Main open={open} drawerWidth={drawerWidth} sx={{ padding: '0px' }}>
			{/* header (toolbar) */}
			<AppBar
				position='fixed'
				open={open}
				drawerWidth={drawerWidth}
				sx={{ backgroundColor: '#fff', boxShadow: 'none', color: '#000' }}
			>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
							onClick={handleDrawerOpen}
							sx={{ mr: 2, ...(open && { display: 'none' }) }}
						>
							<ChevronRightIcon />
						</IconButton>

						{elementToolbar}
					</Box>

					<AvatarButton />
				</Toolbar>
			</AppBar>

			<div style={{ marginTop: '56px' }}></div>

			{/* content */}
			<Outlet></Outlet>
		</Main>
	);
}
