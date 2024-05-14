import React, { useContext } from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";


const Navbar = () => {
    const {isLoggedIn}=useContext(AuthContext);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Box mr="8px">
        <Link href="/" fontSize="xl" fontWeight="bold">
          My University
        </Link>
      </Box>

     {isLoggedIn && 
 <Box
        display={{ base: "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        justifyContent={"space-between"}
      >
        <NavLink to="/studentlist" pr={4}>
          Student List
        </NavLink>
        <NavLink to="/subject" pr={6}>
          Subject
        </NavLink>
        <NavLink to="/marks" pr={4}>
          Marks
        </NavLink>
        <NavLink to="/stream" pr={4}>
          Stream
        </NavLink>
        <NavLink to='/' pr={4}>
            Logout
        </NavLink>
      </Box>
      
     }
     {!isLoggedIn && 
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        flexGrow={1}
        justifyContent="space-evenly"
      >
        
      
            <NavLink to='/login' mr={4}>
              Login
            </NavLink>
            <NavLink to='/signup' mr={4}>
              Sign Up
            </NavLink>
         
        
       
      </Box>
}
    </Flex>
  );
};

export default Navbar;
