import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ShowStatusProps } from "../typescript/interfaces";

const ShowStatus: React.FC<ShowStatusProps> = ({ state }) => {
  if (state.loading) {
    return (
      <Box m="10px 0">
        <Spinner />
      </Box>
    );
  } else {
    if (state.value && state.value === "Error: List not found") {
      return (
        <Box mb="4%">
          <Text fontSize={20} color="red">
            {state.value}
          </Text>
        </Box>
      );
    } else if (state.value) {
      return (
        <Box mb="4%">
          <Text fontSize={20} color="green">
            Found your list! Redirecting...
          </Text>
        </Box>
      );
    } else {
      return null;
    }
  }
};

export default ShowStatus;
