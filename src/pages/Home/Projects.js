import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink, useNavigate } from 'react-router-dom';
import { BoxHover } from './BoxHover';
import { useSelector, useDispatch } from 'react-redux';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import './project.css';
import { Divider, Typography } from '@mui/material';

const styles = {
	divider: {
		borderColor: '#ccc',
	},
	cssArchived: {
		color: '#6d6e6f',
		fontSize: '14px',
	},
};



export default function Projects() {
	const arrProject = useSelector(state => state.ProjectReducer.arrProject);

	const navigate = useNavigate();

	const projects = arrProject ? [...arrProject] : [];

	const addProject = ()=>{
		navigate('/new-project');
	}

	return (
		<Box className='home__projectBlock--border'>
			<Box>
				<p className='home__header--title'>Projects</p>
				<BoxHover className='home__box--addProject' onClick={addProject}>
					<Box className='home__icon--borderAddProject'>
						<AddIcon className='home__icon--addProject' />
					</Box>
					<Typography className='home__typo--addProject' >Add Projects</Typography>
				</BoxHover>
				<Box className='home__box--listProject'>
					{projects.map((project, index) => {
						let keyRender = `${project.projectName} ${index}`;

						return (
							<Box key={keyRender} className='home__box--showProject'>
								<NavLink to='#' className='home__navLink'>
									<BoxHover>
										<Box className='home__box--square'></Box>
										<Box>
											<p>{project.projectName}</p>
											{project.archived ? (
												<Box sx={{ display: 'flex', alignItems: 'center', mt: '6px' }}>
													<InventoryIcon
														color='disabled'
														sx={{ fontSize: '14px', marginRight: '5px' }}
													></InventoryIcon>
													<span style={styles.cssArchived}>Archived</span>
												</Box>
											) : (
												''
											)}
										</Box>
									</BoxHover>
								</NavLink>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
}
