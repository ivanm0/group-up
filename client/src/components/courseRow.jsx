import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChakraProvider, Center, Button, HStack } from '@chakra-ui/react';
import copy from '../copy.png';

const CourseRow = (props) => {
	const navigate = useNavigate();
	return (
		<div>
			<div className="course-row">
				<HStack>
					<Button
						className="course"
						colorScheme="teal"
						variant="outline"
						onClick={() => navigate(`/teacherCourse/${props.id}`)}
					>
						{props.coursename}
					</Button>
					<img
						className="copy-button"
						onClick={() => {
							navigator.clipboard.writeText(props.id);
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

export default CourseRow;
