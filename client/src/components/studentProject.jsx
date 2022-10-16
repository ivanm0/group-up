import React, { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionItem,
	ChakraProvider,
	Button,
	VStack,
	AccordionButton,
	AccordionPanel,
	Box,
	AccordionIcon
} from '@chakra-ui/react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import theme from '../theme';
import '../styles.css';

const Group = (props) => {
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box flex="1" textAlign="left">
						{props.group.groupname}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>{props.group.student_ids}</AccordionPanel>
		</AccordionItem>
	);
};

const StudentProject = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const { state } = useLocation();
	const [ groups, setGroups ] = useState([]);

	useEffect(() => {
		axios.get(`/project/${projectId}/groups`).then((res) => {
			setGroups(res.data.groups);
		});
	});
	return (
		<ChakraProvider theme={theme}>
			<div className="right-corner-button">
				<Button onClick={() => navigate('/createGroup', { state })} colorScheme="teal" width="125px">
					New Group
				</Button>
			</div>
			<div className="left-header">
				<h1>
					<b>{state.project.projectname} Groups</b>
				</h1>
			</div>

			<Accordion className="accordion">
				{groups.map((group) => Group({ group }))}
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Group 1
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						Member 1 | email
						<br />
						Member 2 | email
						<br />
						Member 3 | email
						<br />
						Member 4 | email
						<br />
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Group 1
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						Member 1 | email
						<br />
						Member 2 | email
						<br />
						Member 3 | email
						<br />
						Member 4 | email
						<br />
					</AccordionPanel>
				</AccordionItem>
			</Accordion>

			{/* <div className="left-header">
				<h1>
					<b>Individuals</b>
				</h1>
			</div>

			<div>
				<Accordion> 
					<AccordionItem>
						<Button colorScheme="teal" variant="outline" />
					</AccordionItem>
				</Accordion>
			</div> */}
		</ChakraProvider>
	);
};

export default StudentProject;
