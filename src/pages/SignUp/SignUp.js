import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../../services/registerService';

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_INVALID = 'Email is invalid !';
const TEXT_ERROR_PASSWORD = 'Your password must have at least 8 characters !';
const TEXT_ERROR_USERNAME = 'User name must have at least 5 characters !';
const TEXT_ERROR_EXIST_USERNAME = 'The user name already exists !';
const TEXT_ERROR_EXIST_EMAIL = 'The email already exists !';

const styles = {
	spanExistAcount: {
		fontSize: '14px',
		color: '#ba1d23',
		padding: '10px',
		backgroundColor: '#efbfc1',
		width: '100%',
		textAlign: 'center',
		margin: '30px',
	},
};

export default function SignUp() {
	let navigate = useNavigate();

	const [state, setState] = useState({
		values: { userName: '', email: '', password: '' },
		errors: { userName: '', email: '', password: '' },
	});

	const [showPassword, setShowPassword] = useState(false);

	const [checkExistAcount, setCheckExistAcount] = useState(true);

	const [textExistAcount, setTextExistAcount] = useState('');

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = event => {
		event.preventDefault();

		let indexError = Object.values(state.errors).findIndex(error => error !== '');

		if (indexError === -1) {
			// console.log("dk thanh cong");
			// navigate("/verify-email");

			let values = { ...state.values };
			registerApi(values);
		}

		return false;
	};

	const registerApi = async values => {
		const result = await registerService(values);

		if (result.status === 200) {
			navigate('/verify-email');
		}

		if (result.status === 400) {
			setCheckExistAcount(false);
			setTextExistAcount(TEXT_ERROR_EXIST_EMAIL);
		}

		if (result.status === 500) {
			setCheckExistAcount(false);
			setTextExistAcount(TEXT_ERROR_EXIST_USERNAME);
		}
	};

	const validate = (name, value, newErrors) => {
		if (!value.trim()) {
			newErrors[name] = `${name} is required !`;
			return;
		}

		switch (name) {
			case 'userName': {
				let checkLength = value.length >= 5;
				newErrors.userName = checkLength ? '' : TEXT_ERROR_USERNAME;
				break;
			}

			case 'email': {
				let checkRegex = EMAIL_REGEX.test(value.toLowerCase());
				newErrors.email = checkRegex ? '' : EMAIL_INVALID;
				break;
			}

			case 'password': {
				let checkLength = value.length >= 8;
				newErrors.password = checkLength ? '' : TEXT_ERROR_PASSWORD;
				break;
			}

			default:
				return;
		}
	};

	const getValue = event => {
		const { name, value } = event.target;
		const newValues = { ...state.values, [name]: value };
		const newErrors = { ...state.errors };

		validate(name, value, newErrors);
		setState({ values: newValues, errors: newErrors });
	};

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(https://source.unsplash.com/random)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: t =>
						t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'orange' }}></Avatar>

					<Typography component='h1' variant='h5' mb={3}>
						Sign up
					</Typography>

					{checkExistAcount ? (
						''
					) : (
						<span style={styles.spanExistAcount}>{textExistAcount}</span>
					)}

					<form onSubmit={handleSubmit} style={{ width: '100%' }}>
						<TextField
							autoFocus
							onChange={getValue}
							required
							fullWidth
							id='userName'
							label='User Name'
							name='userName'
							autoComplete='userName'
							error={state.errors.userName !== ''}
							helperText={state.errors.userName}
						/>

						{/* email */}
						<TextField
							onChange={getValue}
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							error={state.errors.email !== ''}
							helperText={state.errors.email}
						/>

						{/* password */}
						<div style={{ position: 'relative' }}>
							<TextField
								onChange={getValue}
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								id='password'
								autoComplete='current-password'
								error={state.errors.password !== ''}
								helperText={state.errors.password}
								value={state.values.password}
							/>

							<InputAdornment
								sx={{ position: 'absolute', right: '14px', top: '44px' }}
							>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						</div>

						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
					</form>
				</Box>
			</Grid>
		</Grid>
	);
}
