import React, { useEffect, useState } from 'react';
import { ChakraProvider, Center, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import theme from '../theme';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles.css';
import copy from '../copy.png';
import axios from 'axios';

const Project = (props) => {
	return (
		<div>
			<div className="course-row">
				<HStack>
					<Button
						className="course"
						colorScheme="teal"
						variant="outline"
						// onClick={() => props.navigateCourse(props.course)}
					>
						{props.project.projectname}
					</Button>
					{/* <img
						className="copy-button"
						onClick={() => {
							navigator.clipboard.writeText(props.project.id);
						}}
						src={copy}
					/> */}
				</HStack>
			</div>
			<br />
			<br />
		</div>
	);
};

const TeacherCourses = () => {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const { state } = useLocation();
	const [ projects, setProjects ] = useState([]);

	useEffect(() => {
		axios.get(`/${courseId}/projects`).then((res) => {
			setProjects(res.data.projects);
		});
	});
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

			<div className="group-courses">{projects.map((project) => Project({ project }))}</div>
		</ChakraProvider>
	);
};

export default TeacherCourses;
