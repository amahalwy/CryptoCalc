import { Spinner, Box } from "@chakra-ui/react";
import React from "react";

const Loading = () => (
  <Box
    d="flex"
    p="40% 0"
    justifyContent="center"
    bg="white"
    opacity="0.4"
    pos="fixed"
    w="100%"
    h="100%"
    zIndex={3}
  >
    <Spinner speed="0.65s" size="xl" />
  </Box>
);

export default Loading;
