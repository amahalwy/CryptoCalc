import React from "react";
import { Box } from "@chakra-ui/react";

const RunningTotal = ({ total }) => {
  return (
    <Box w="98%" m="0 auto">
      Grand total: {total.toFixed(2)}
    </Box>
  );
};

export default RunningTotal;
