import React from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { numberWithCommas } from "../generals/functions";

const RenderTotal = ({ total }) => {
  if (total <= 1000000) {
    const rem = numberWithCommas((1000000 - total).toFixed(2));
    return (
      <Box>
        <Text color="green" d="inline" fontSize={20} mr="4px">
          ${numberWithCommas(total.toFixed(2))}
        </Text>
        <Text d="inline" fontSize={20}>
          (${rem} left)
        </Text>
      </Box>
    );
  } else {
    const over = numberWithCommas((total - 1000000).toFixed(2));
    return (
      <Box>
        <Text color="red" d="inline" fontSize={20}>
          ${numberWithCommas(total.toFixed(2))}
        </Text>
        <Text d="inline" fontSize={20}>
          (${over} over!)
        </Text>
      </Box>
    );
  }
};

const RunningTotal = ({ total, calculatingTotal, setCalculatingTotal }) => {
  return (
    <Box m="10px auto" pb="20px">
      <Box d="flex" alignItems="center">
        <Text fontSize={20} mr="4px">
          Grand total:
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
