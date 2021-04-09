import { Box, Text, Divider } from "@chakra-ui/react";
import React from "react";

const THead = () => {
  return (
    <Box w="100%" px={6} py={4}>
      <Box d="flex" w="100%">
        <Box w="30%">
          <Text fontWeight={500} fontSize={16}>
            Place
          </Text>
        </Box>
        <Box w="40%">
          <Text fontWeight={500} fontSize={16}>
            Name
          </Text>
        </Box>
        <Box w="30%">
          <Text fontWeight={500} fontSize={16}>
            Value
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default THead;
