import React from 'react';
import { ChakraProvider, Center, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import theme from '../theme';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles.css';
import copy from '../copy.png';

const TeacherCourses = () => {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const { state } = useLocation();
	return (
		<ChakraProvider theme={theme}>
			<div className="right-corner-button">
				<Button onClick={() => navigate('/teacherAddProject', { state })} colorScheme="teal" width="125px">
					Add Project
				</Button>
			</div>
			<div className="left-header">
				<h1>
					<b>{state.coursename} Projects</b>
				</h1>
			</div>

			{/* <div className="group-courses">{courses.map((course) => Course({ course, navigateCourse }))}</div> */}
		</ChakraProvider>
	);
};

export default TeacherCourses;
