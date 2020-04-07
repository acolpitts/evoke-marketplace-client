import React from "react";
import { Box, Text, Heading } from "gestalt";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="around"
        height={70}
        color="midnight"
        padding={1}
        shape="roundedBottom"
      >
        <NavLink activeClassName="active" to="/signin">
          <Text color="white">Sign In</Text>
        </NavLink>
        <NavLink to="/">
          <Heading color="white">App</Heading>
        </NavLink>
        <NavLink activeClassName="active" to="/signup">
          <Text color="white">Sign Up</Text>
        </NavLink>
      </Box>
    </nav>
  );
};

export default Navbar;
