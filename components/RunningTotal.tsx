import React from "react";
import { Box, Text, Progress, Spinner } from "@chakra-ui/react";
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

const RunningTotal = ({ total, calculatingTotal, setCalculatingTotal }) => {
  return (
    <Box w="98%" m="10px auto" pb="20px">
      <Box d="flex" alignItems="center">
        <Text fontSize={20} mr="4px">
          Grand total:{" "}
        </Text>
        {calculatingTotal ? (
          <Box d="flex">
            <Text>Calculating...</Text>
            <Spinner label="Calculating total" />
          </Box>
        ) : (
          <RenderTotal total={total} />
        )}
      </Box>
    </Box>
  );
};

export default RunningTotal;
