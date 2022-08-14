import {
	Box,
	ClickAwayListener,
	Grid,
	Menu,
	MenuItem,
	Popover,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import ShortTextIcon from '@mui/icons-material/ShortText';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	MODAL_ACTION_CLOSE,
	MODAL_ACTION_CONFIRM,
} from '../../../constants/constants';
import { deleteSectionAction } from '../../../redux/actions/ProjectAction';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import {
	archiveSectionApi,
	updateTitleSectionApi,
} from '../../../redux/actions/SectionAction';
import ButtonProjectList from '../../../components/ButtonProjectList/ButtonProjectList';
import { TooltipCustomize } from '../../../components/ToolTip/ToolTip';
import { ProgressListener } from '../../../components/ProgressTest/Progress';

const styles = {
	textTitle: {
		cursor: 'pointer',
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	icon: {
		fontSize: '15px',
	},
	iconHover: {
		fontSize: '17px',
	},
	titleBlockAfterActive: {
		backgroundColor: '#fff',
	},
	titleBlockBeforeActive: {
		backgroundColor: '#fff',
		borderRadius: '10px',
		border: '1px solid grey',
	},
};

export default function ProjectSectionForm(props) {
	const {
		onMouseDown,
		onMouseUp,
		isExpand,
		onClickExpandButton,
		sectionId,
		sectionName,
		onClickAddTaskAbove,
		onClickAddSectionAbove,
		onClickAddSectionBelow,
	} = props;

	const [isShowMenuSection, setIsShowMenuSection] = useState(false);
	const [isShowModalDelete, setShowModalDelete] = useState(false);

	const dispatch = useDispatch();
	const searchInput = useRef(null);

	const toggleModal = () => {
		setShowModalDelete(!isShowModalDelete);
	};

	const handleShowMenuSection = () => {
		setIsShowMenuSection(!isShowMenuSection);
		setOpen(prev => !prev);
	};

	const handleModalArchiveSection = async type => {
		if (type === MODAL_ACTION_CONFIRM) {
			ProgressListener.emit('start');
			await dispatch(archiveSectionApi(sectionId));
			ProgressListener.emit('stop');
		}
		setIsShowMenuSection(false);
		setShowModalDelete(false);
	};

	const handleEditTitleSection = async e => {
		const titleSection = e.target.value;
		const titleSectionEdit = !titleSection.trim()
			? 'Untitled section'
			: titleSection;

		const dataSection = {
			sectionId: sectionId,
			sectionName: titleSectionEdit,
		};
		e.target.value = titleSectionEdit;
		ProgressListener.emit('start');
		await dispatch(updateTitleSectionApi(dataSection));
		ProgressListener.emit('stop');
	};

	const handleKeyPress = value => {
		if (value.key === 'Enter') {
			searchInput.current.blur();
		}
	};

	const [open, setOpen] = useState(false);

	const handleClickAway = () => {
		setIsShowMenuSection(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Grid item className='title__content '>
				<Box
					className='row-drag-handle'
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}
				>
					<TooltipCustomize title='drag to move' placement='bottom'>
						<DragIndicatorSharpIcon
							style={styles.icon}
							className='sectionForm__icon'
						/>
					</TooltipCustomize>
				</Box>
				<ButtonProjectList
					icon={
						isExpand ? (
							<TooltipCustomize title='close tasks' placement='bottom'>
								<ExpandMoreIcon style={styles.icon} className='sectionForm__icon' />
							</TooltipCustomize>
						) : (
							<TooltipCustomize title='expand tasks' placement='bottom'>
								<ChevronRightIcon style={styles.icon} className='sectionForm__icon' />
							</TooltipCustomize>
						)
					}
					id='title_button--expand'
					onClickButton={onClickExpandButton}
				/>
				<TextField
					onBlur={handleEditTitleSection}
					sx={{
						width: '175px',
						'& .MuiOutlinedInput-root:hover': {
							'& > fieldset': {
								borderColor: 'gray',
							},
						},
						'& .MuiOutlinedInput-root.Mui-focused': {
							'& > fieldset': {
								borderColor: '#0057B7',
							},
						},
						'& .MuiOutlinedInput-root': {
							'& > fieldset': {
								borderColor: 'white',
								borderRadius: '10px',
							},
						},
						'&': {
							input: {
								padding: '10px',
								fontWeight: 'bold',
								fontSize: '15px',
							},
						},
						borderColor: 'white',
					}}
					placeholder={'Write a section name'}
					className='Box__input--addTask'
					defaultValue={sectionName}
					onKeyPress={handleKeyPress}
					inputRef={searchInput}
				/>
				<Box onClick={onClickAddTaskAbove}>
					<TooltipCustomize title='add task' placement='bottom'>
						<AddIcon
							style={styles.icon}
							className='sectionForm__icon sectionForm__icon--addTask'
						/>
					</TooltipCustomize>
				</Box>
				<Box className='sectionForm__menu--addSection'>
					<TooltipCustomize title='More actions' placement='bottom'>
						<MoreHorizIcon className='btnOption' onClick={handleShowMenuSection} />
					</TooltipCustomize>
					<Box
						display={isShowMenuSection ? 'block' : 'none'}
						className='sectionForm__items--addSection'
					>
						<ButtonProjectList
							icon={<ArrowUpwardIcon style={styles.icon} />}
							id='dropItem__button--addSectionAbove'
							text='Add section above'
							onClickButton={onClickAddSectionAbove}
						/>
						<ButtonProjectList
							icon={<ArrowDownwardIcon style={styles.icon} />}
							id='dropItem__button--addSectionBelow'
							text='Add section below'
							onClickButton={onClickAddSectionBelow}
						/>
						<ButtonProjectList
							icon={<DeleteOutlineIcon style={styles.icon} id='button-delSection' />}
							id='dropItem__button--delSection'
							text='Archive Section'
							onClickButton={toggleModal}
						/>
					</Box>
					<ConfirmModal
						show={isShowModalDelete}
						title='Archive this section'
						content={
							<span>
								Are you sure you want to archive this section <b>{sectionName}</b>?
							</span>
						}
						onAction={handleModalArchiveSection}
						nameBtnConfirm='Archive section'
					/>
				</Box>
			</Grid>
		</ClickAwayListener>
	);
}
