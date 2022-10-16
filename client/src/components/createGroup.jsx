import React, { useState } from 'react';
import { ChakraProvider, Center, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import theme from '../theme';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';
import copy from '../copy.png';
import axios from 'axios';

const CreateGroup = (props) => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [ name, setName ] = useState('');
	const createCourse = () => {
		axios
			.post('/group', { project_id: state.id, groupname: name, student_ids: [ '0924HF2NWWOIFHWOW' ] })
			.then(() => {
				navigate(`/project/${state.id}`, { state });
			});
	};
	return (
		<ChakraProvider theme={theme}>
			<div>
				<Center paddingTop={'175px'} marginBottom={'25px'} style={{ fontSize: '30px' }}>
					<VStack spacing={8}>
						<Text>Create Group</Text>
						<div>
							<Input
								className="add-course"
								colorScheme="teal"
								variant="outline"
								placeholder="Group Name"
								onChange={(e) => setName(e.target.value)}
								style={{ width: '400px' }}
							/>
						</div>
						<div>
							<HStack spacing={8}>
								<Button colorScheme="teal" variant="outline" onClick={createCourse}>
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

export default CreateGroup;
