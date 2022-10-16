import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = '195055295608-gjvnf37g5n4jdero49bod908e6p40igs.apps.googleusercontent.com';

function App() {
	const [ test, setTest ] = useState('hi');

	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: clientId,
				scope: ''
			});
		};
		gapi.load('client:auth2', initClient);
	});

	useEffect(() => {
		axios({
			method: 'GET',
			url: '/test'
		}).then((res) => {
			console.log(res);
			setTest(res.data.msg);
		});
	});

	const [ profile, setProfile ] = useState([]);
	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: clientId,
				scope: ''
			});
		};
		gapi.load('client:auth2', initClient);
	});

	const onSuccess = (res) => {
		setProfile(res.profileObj);
	};

	const onFailure = (err) => {
		console.log('failed', err);
	};

	const logOut = () => {
		setProfile(null);
	};

	return (
		<div className="App">
			<div>
				<h2>React Google Login</h2>
				<br />
				<br />
				{profile ? (
					<div>
						<img src={profile.imageUrl} alt="user image" />
						<h3>User Logged in</h3>
						<p>Name: {profile.name}</p>
						<p>Email Address: {profile.email}</p>
						<br />
						<br />
						<GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
					</div>
				) : (
					<GoogleLogin
						clientId={clientId}
						buttonText="Sign in with Google"
						onSuccess={onSuccess}
						onFailure={onFailure}
						cookiePolicy={'single_host_origin'}
						isSignedIn={true}
					/>
				)}
			</div>
			<p>{test}</p>
		</div>
	);
}

export default App;
