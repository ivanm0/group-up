import React, { useState } from 'react';
import { ChakraProvider, Center, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import theme from '../theme';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';
import copy from '../copy.png';
import axios from 'axios';

const AddProject = (props) => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [ name, setName ] = useState('');
	const [ minSize, setMinSize ] = useState();
	const [ maxSize, setMaxSize ] = useState();
	const createProject = () => {
		axios
			.post('/project', { course_id: state.id, projectname: name, min_size: minSize, max_size: maxSize })
			.then(() => {
				navigate(`/teacherCourse/${state.id}`, { state });
			});
	};
	return (
		<ChakraProvider theme={theme}>
			<div>
				<Center paddingTop={'175px'} marginBottom={'25px'} style={{ fontSize: '30px' }}>
					<VStack spacing={8}>
						<Text>Add Project</Text>
						<div>
							<Input
								className="add-course"
								colorScheme="teal"
								variant="outline"
								placeholder="Project Name"
								onChange={(e) => setName(e.target.value)}
								style={{ width: '400px' }}
							/>
						</div>
						<div>
							<Input
								className="add-course"
								colorScheme="teal"
								variant="outline"
								placeholder="Minimum Group Size"
								onChange={(e) => setMinSize(e.target.value)}
								style={{ width: '400px' }}
							/>
						</div>
						<div>
							<Input
								className="add-course"
								colorScheme="teal"
								variant="outline"
								placeholder="Maximum Group Size"
								onChange={(e) => setMaxSize(e.target.value)}
								style={{ width: '400px' }}
							/>
						</div>
						<div>
							<HStack spacing={8}>
								<Button colorScheme="teal" variant="outline" onClick={createProject}>
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

export default AddProject;
