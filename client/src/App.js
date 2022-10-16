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
import Main from './Main';



function App() {
	
	return (
		<ChakraProvider theme={theme}>
		<div className="App">
      		<img className="logo" src={group}/>
			  	
				<Routes>
					<Route path="/" element={<Main />}/>
          			<Route path="/studentHome" element={<Student />} />
          			<Route path="/teacherHome" element={<Teacher />} />
        		</Routes>
				
		</div>
		</ChakraProvider>
	);
}

export default App;
