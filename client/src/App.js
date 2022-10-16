import group from './group.png';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Student from './components/studentHome';
import teacher from './components/teacherHome';
import {
	ChakraProvider,
	Center,
	Button,
	HStack,
  } from '@chakra-ui/react'
  import theme from './theme';

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	Link
} from "react-router-dom";

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

	const teacherPage = () => {
		return {teacher};
	};

	const studentPage = () => {
		return {student};
	};

	return (
		<ChakraProvider theme={theme}>
		<div className="App">
      		<img className="logo" src={group}/>

			<>
			<Router>
				<Routes>
          			<Route path="/teacherHome" component={<Teacher/>} />
					<Route path="/studentHome" component={<Student/>} />
					<Navigate to="/" />
				</Routes>
			</Router>
			</>

			<div>
				{profile ? (
					<div>
						<div>
							{/* Todo: Should only ask who are you? for first sign in */}
							<Center marginTop={'175px'} marginBottom={'25px'} style={{fontSize: '50px'}}>
								Who are you?
							</Center>
							<Center>
							<HStack spacing={8}>
								<Link>
								</Link>
								<Button onClick={studentPage} colorScheme='teal' width='300px'>Teacher</Button>

								{/* <Button onClick={studentPage} colorScheme='teal' width='300px'>Teacher</Button> */}
								{/* Todo: Add teacher or student to the cockroachDB */}
								<Button onClick={teacherPage} colorScheme='teal' width='300px'>Student</Button>
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
					</div>

				) : (
					<div>
						<div>
						<Center marginTop={'175px'} marginBottom={'25px'}>
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
					</div>
					
				)}
			</div>
		</div>
		</ChakraProvider>
	);
}

export default App;
