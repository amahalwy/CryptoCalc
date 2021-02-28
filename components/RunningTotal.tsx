import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { numberWithCommas } from "../generals/functions";

const RunningTotal = ({ total }) => {
  console.log(total);
  return (
    <Box w="98%" m="20px auto" pb="20px">
      <Text fontSize={20}>
        Grand total: ${numberWithCommas(total.toFixed(2))}
      </Text>
      <Text fontSize={20}>Value Change: </Text>
    </Box>
  );
};

export default RunningTotal;
