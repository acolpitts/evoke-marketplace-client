import React from "react";
import { GridLoader } from "react-spinners";
import { Box } from "gestalt";

const Loader = ({ show = false }) =>
  show && (
    <Box
      position="fixed"
      dangerouslySetInlineStyle={{
        __style: {
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        },
      }}
    >
      <GridLoader color="#133a5e" size={16} margin="3px" />
    </Box>
  );

export default Loader;
