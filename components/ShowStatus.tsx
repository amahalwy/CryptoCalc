import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { ShowStatusProps } from "../typescript/interfaces";

const ShowStatus: React.FC<ShowStatusProps> = ({ state }) => {
  if (state.loading) {
    return (
      <Box mb="20px">
        <Spinner />
      </Box>
    );
  } else if (state.value && state.value.status === 404) {
    return (
      <Box color="red" mb="20px">
        Error: Couldn't find your list
      </Box>
    );
  } else if (state.value && state.value.status === 200) {
    return (
      <Box color="green" mb="20px">
        Found your Portfolio! Redirecting...{" "}
      </Box>
    );
  } else if (state.value && state.value.status === 201) {
    return (
      <Box color="green" mb="20px">
        Created your Portfolio! Redirecting...{" "}
      </Box>
    );
  } else {
    return null;
  }
};

export default ShowStatus;
