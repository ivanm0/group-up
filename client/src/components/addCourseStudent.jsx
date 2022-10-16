import React, { useState } from 'react';
import { ChakraProvider, Center, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import theme from '../theme';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';
import copy from '../copy.png';
import axios from 'axios';

const AddCourseStudent = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [ code, setCode ] = useState();
	const [ bio, setBio ] = useState();
	const enrollCourse = () => {
		axios.post('/course/enroll', { student_id: state.studentId, code: code, bio: bio }).then(() => {
			navigate('/studentHome', { state });
		});
	};
	return (
		<ChakraProvider theme={theme}>
			<div>
				<Center paddingTop={'175px'} marginBottom={'25px'} style={{ fontSize: '30px' }}>
					<VStack spacing={8}>
						<Text>Add Course</Text>
						<div>
							<Input
								className="add-course"
								colorScheme="teal"
								variant="outline"
								placeholder="Course Link"
								onChange={(e) => setCode(e.target.value)}
							/>
							<Input
								className="add-course"
								colorScheme="teal"
								variant="outline"
								placeholder="Bio"
								onChange={(e) => setBio(e.target.value)}
							/>
						</div>
						<div>
							<HStack spacing={8}>
								<Button colorScheme="teal" variant="outline" onClick={enrollCourse}>
									Submit
								</Button>
								<Button colorScheme="teal" variant="outline" onClick={() => navigate('/studentHome')}>
									Cancel
								</Button>
							</HStack>
						</div>
					</VStack>
				</Center>
			</div>
		</ChakraProvider>
	);
};

export default AddCourseStudent;
