import group from './group.png';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Student from './components/studentHome';
import Teacher from './components/teacherHome';
import {
	ChakraProvider,
	Center,
	Button,
	HStack,
  } from '@chakra-ui/react'
  import theme from './theme';
import {Routes, Route, useNavigate } from "react-router-dom";


const clientId = '195055295608-gjvnf37g5n4jdero49bod908e6p40igs.apps.googleusercontent.com';

function Main() {
	const [ test, setTest ] = useState('hi');

	const navigate = useNavigate();

	const navigateTeacher = () => {
        navigate('/teacherHome')
	}

	const navigateStudent = () => {
		navigate('/studentHome')
	}
	
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
		<ChakraProvider theme={theme}>
		<div className="Main">
      		<img className="logo" src={group}/>

			<div>
				{profile ? (
					<div>
						{/* Todo: Should only ask who are you? for first sign in */}
						<Center paddingTop={'175px'} marginBottom={'25px'} style={{fontSize: '50px'}}>
							Who are you?
						</Center>
						<Center>
						<HStack spacing={8}>
							<Button onClick={navigateTeacher} colorScheme='teal' width='300px'>Teacher</Button>
							{/* Todo: Add teacher or student to the cockroachDB */}
							<Button onClick={navigateStudent} colorScheme='teal' width='300px'>Student</Button>
						</HStack>
						</Center>
						<GoogleLogout 
							clientId={clientId} 
							render={renderProps => (
								<Button onClick={renderProps.onClick} marginTop={'75px'} colorScheme='teal'>log out</Button>
							)}
							onLogoutSuccess={logOut} 
						/>
					</div>

				) : (
					<div>
						<Center paddingTop={'175px'} marginBottom={'25px'}>
						<b style={{fontSize: '50px'}}>groUP</b> 
						</Center>
						<Center h='0px'>
							Project partnering made easy.
						</Center>
						<GoogleLogin
							clientId={clientId}
							render={renderProps => (
								<Button onClick={renderProps.onClick} marginTop={'75px'} colorScheme='teal'>sign in with Google</Button>
							)}
							onSuccess={onSuccess}
							onFailure={onFailure}
							cookiePolicy={'single_host_origin'}
							isSignedIn={true}
						/>
					</div>
					
				)}
			</div>
		</div>
		</ChakraProvider>
	);
}

export default Main;
