import group from './group.png';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Student from './components/studentHome';
import Teacher from './components/teacherHome';
import StudentAddCourse from './components/addCourseStudent';
import TeacherAddCourse from './components/addCourseTeacher';
import { ChakraProvider, Center, Button, HStack } from '@chakra-ui/react';
import theme from './theme';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './Main';
import TeacherCourses from './components/teacherCourse';
import StudentCourses from './components/studentCourse';
import AddProject from './components/addProject';
import StudentProject from './components/studentProject';
import CreateGroup from './components/createGroup';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<img className="logo" src={group} />

				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/studentHome" element={<Student />} />
					<Route path="/studentAddCourse" element={<StudentAddCourse />} />
					<Route path="/teacherHome" element={<Teacher />} />
					<Route path="/teacherAddCourse" element={<TeacherAddCourse />} />
					<Route path="/teacherAddProject" element={<AddProject />} />
					<Route path="/teacherCourse/:courseId" element={<TeacherCourses />} />
					<Route path="/studentCourse/:courseId" element={<StudentCourses />} />
					<Route path="/studentProject/:projectId" element={<StudentProject />} />
					<Route path="/createGroup" element={<CreateGroup />} />
				</Routes>
			</div>
		</ChakraProvider>
	);
}

export default App;
