
import React from "react";
import {
	ChakraProvider,
	Center,
	Button,
	VStack,
    HStack,
    Text,
    Input
  } from '@chakra-ui/react'
  import theme from '../theme';
import {Routes, Route, useNavigate } from "react-router-dom";
import '../styles.css';
import copy from '../copy.png'

  
const AddCourseStudent = () => {
    const navigate = useNavigate();
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Center paddingTop={'175px'} marginBottom={'25px'} style={{fontSize: '30px'}}>
            <VStack spacing={8}>
                <Text>Add Course</Text>
                <div>
                <Input className="add-course" colorScheme='teal' variant='outline' placeholder='Course Link'/>
                <Input className="add-course" colorScheme='teal' variant='outline' placeholder='Bio' />
                </div>
                <div>
                    <HStack spacing={8}>
                        <Button colorScheme='teal' variant='outline'>Submit</Button>
                        <Button colorScheme='teal' variant='outline' onClick={() => navigate("/studentHome")}>Cancel</Button>
                    </HStack>
                </div>
            </VStack>
        </Center>
    </div>

    </ChakraProvider>
  );
};
  
export default AddCourseStudent;