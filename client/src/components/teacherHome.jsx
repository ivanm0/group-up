
import React from "react";
import {
	ChakraProvider,
	Center,
	Button,
	HStack,
  } from '@chakra-ui/react'
  import theme from '../theme';
import {Routes, Route, useNavigate } from "react-router-dom";
import '../styles.css';
import copy from '../copy.png'

const forLoopComponent = (courses) => {
  for (let i = 0; i < courses.length; i++) {
    subComponent(courses[i]);
  }
}

const subComponent = () => {
  return <div>
    <div className="course-row">
    <HStack>
      <Button className="course" colorScheme='teal' variant='outline'>Course Name</Button>
      <img className="copy-button" src={copy}/>    
    </HStack>
    </div> 
    <br/>   
    <br/> 
  </div>
  ;
};
  
const teacherHome = () => {
  return (
    <ChakraProvider theme={theme}>
      <div className="right-corner-button">
        <Button colorScheme='teal' width='125px'>Add Course</Button>
      </div>
      <div className="left-header">
        <h1><b>Courses</b></h1>
      </div>

      <div className="group-courses">
        {subComponent()}
        {subComponent()}  
      </div>

    </ChakraProvider>
  );
};
  
export default teacherHome;