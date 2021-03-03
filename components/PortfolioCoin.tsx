import React from "react";
import { Box, Text } from "@chakra-ui/react";

const PortfolioCoin = ({ coin }) => {
  return (
    <Box>
      <Text>{coin.name}</Text>
    </Box>
  );
};

export default PortfolioCoin;
