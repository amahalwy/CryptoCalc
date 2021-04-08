import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  capitalize,
  numberWithCommas,
  renderChangePercent,
} from "../generals/functions";

const TRow = ({ pos, list }) => {
  return (
    <Box px={6} py={4} bg={pos % 2 === 0 ? "gray.100" : "white"}>
      <Box d="flex">
        <Box d="flex" p="0 7.5%" w="15%" justifyContent="center">
          <Text>{pos}</Text>
        </Box>
        <Box w="50%" p="0 15%">
          <Text textAlign="left">{capitalize(list.owner.name)}</Text>
        </Box>
        <Box w="30%">
          <Text fontSize={16} mr="6px">
            ${numberWithCommas(list.currentTotal)}
          </Text>
          <Text
            fontSize={12}
            h="100%"
            color={renderChangePercent(list.percentChange)}
          >
            ({list.percentChange > 0 ? `+` : `-`}
            {list.percentChange.toFixed(3)}%)
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TRow;
