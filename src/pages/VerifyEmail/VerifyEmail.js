import React from 'react';
import './verifyEmail.css';

export default function VerifyEmail() {
	return (
		<div className='container'>
			<div className='container__verify'>
				<img
					style={{ marginBottom: '40px' }}
					src='./img/logoAsena.png'
					alt='Logo'
				/>
				<div>
					<p className='text__verify'>Please verify your email address</p>
					<p className='text__google'>
						Get started with Asana Premium! Continue with Google to verify
					</p>
					{/* <button> <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">gg</a></button> */}
				</div>
			</div>
		</div>
	);
}
