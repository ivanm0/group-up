import React, { useEffect, useState } from 'react';
import { ChakraProvider, Center, Button, HStack } from '@chakra-ui/react';
import theme from '../theme';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';
import copy from '../copy.png';
import axios from 'axios';

const forLoopComponent = (courses) => {
	for (let i = 0; i < courses.length; i++) {
		Course(courses[i]);
	}
};

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

const TeacherHome = (props) => {
	const { state } = useLocation();
	const [ courses, setCourses ] = useState([]);
	useEffect(() => {
		axios.get(`/teacher/${state.teacherId}/courses`).then((res) => {
			setCourses(res.data.courses);
		});
	});
	const navigate = useNavigate();

	const navigateCourse = (course) => {
		navigate(`/teacherCourse/${course.id}`, { state: course });
	};

	return (
		<ChakraProvider theme={theme}>
			<div className="right-corner-button">
				<Button
					onClick={() => navigate('/teacherAddCourse', { state: { teacherId: state.teacherId } })}
					colorScheme="teal"
					width="125px"
				>
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

export default TeacherHome;
