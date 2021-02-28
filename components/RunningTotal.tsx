import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { numberWithCommas } from "../generals/functions";

const RenderTotal = ({ total }) => {
  if (total <= 1000000) {
    return (
      <Text color="green" d="inline" fontSize={20}>
        ${numberWithCommas(total.toFixed(2))}
      </Text>
    );
  } else {
    return (
      <Text color="red" d="inline" fontSize={20}>
        ${numberWithCommas(total.toFixed(2))}
      </Text>
    );
  }
};

const RunningTotal = ({ total }) => {
  return (
    <Box w="98%" m="20px auto" pb="20px">
      <Box>
        <Text d="inline" fontSize={20}>
          Grand total:
        </Text>
        <RenderTotal total={total} />
      </Box>
      <Text fontSize={20}>Value Change: </Text>
    </Box>
  );
};

export default RunningTotal;
