import React, { useEffect, useState } from 'react';
import { ChakraProvider, Center, Button, HStack } from '@chakra-ui/react';
import theme from '../theme';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';
import copy from '../copy.png';
import axios from 'axios';

const Course = (props) => {
	return (
		<div>
			<div className="course-row">
				<HStack>
					<Button
						className="course"
						colorScheme="teal"
						variant="outline"
						onClick={() => props.navigateCourse(props.course)}
					>
						{props.course.coursename}
					</Button>
					<img
						className="copy-button"
						onClick={() => {
							navigator.clipboard.writeText(props.course.id);
						}}
						src={copy}
					/>
				</HStack>
			</div>
			<br />
			<br />
		</div>
	);
};

const StudentHome = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [ courses, setCourses ] = useState([]);
	useEffect(() => {
		axios.get(`/student/${state.studentId}/courses`).then((res) => {
			setCourses(res.data.courses);
		});
	});

	const navigateCourse = (course) => {
		navigate(`/studentCourse/${course.id}`, { state: course });
	};

	return (
		<ChakraProvider theme={theme}>
			<div className="right-corner-button">
				<Button onClick={() => navigate('/studentAddCourse', { state })} colorScheme="teal" width="125px">
					Add Course
				</Button>
			</div>
			<div className="left-header">
				<h1>
					<b>Courses</b>
				</h1>
			</div>

			<div className="group-courses">{courses.map((course) => Course({ course, navigateCourse }))}</div>
		</ChakraProvider>
	);
};

export default StudentHome;
