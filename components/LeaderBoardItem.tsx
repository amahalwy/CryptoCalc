import React from "react";
import { Box, Text } from "@chakra-ui/layout";

const LeaderBoardList = ({ list, position }) => {
  console.log(list);
  return (
    <Box bg="blue.100" d="flex" justifyContent="space-between">
      <Box>
        <Text>{position + 1}</Text>
      </Box>
      <Box>
        <Text>{list.owner.name}</Text>
      </Box>
      <Box>{list.currentTotal}</Box>
    </Box>
  );
};

export default LeaderBoardList;
