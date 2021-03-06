import React from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { numberWithCommas } from "../generals/functions";
import { RunningTotalProps } from "../typescript/interfaces";

const RenderTotal: React.FC<{ total: number }> = ({ total }) => {
  if (total === 0) {
    return null;
  }
  if (total <= 1000000) {
    const rem: string = numberWithCommas(Number((1000000 - total).toFixed(2)));
    return (
      <Box>
        <Text color="green" d="inline" fontSize={20} mr="4px">
          ${numberWithCommas(Number(total.toFixed(2)))}
        </Text>
        <Text d="inline" fontSize={20}>
          (${rem} left)
        </Text>
      </Box>
    );
  } else {
    const over: string = numberWithCommas(Number((total - 1000000).toFixed(2)));
    return (
      <Box>
        <Text color="red" d="inline" fontSize={20}>
          ${numberWithCommas(Number(total.toFixed(2)))}
        </Text>
        <Text d="inline" fontSize={20}>
          (${over} over!)
        </Text>
      </Box>
    );
  }
};

const RunningTotal: React.FC<RunningTotalProps> = ({
  total,
  calculatingTotal,
}) => {
  return (
    <Box m="10px auto">
      <Box d={{ base: "block", lg: "flex" }} alignItems="center">
        <Text fontSize={20} mr="4px">
          Grand total:
        </Text>
        {calculatingTotal ? (
          <Box d="flex">
            <Text mr="4px">Calculating...</Text>
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
