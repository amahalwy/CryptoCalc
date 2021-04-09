import { Box } from "@chakra-ui/layout";
import { Heading, CircularProgress } from "@chakra-ui/react";
import React from "react";

const PortfolioRefreshing = ({ update, active }) => {
  if (update > 0 && update && active) {
    return (
      <Heading>
        Refreshing prices in: {update}
        {update > 0 ? "s" : null}
      </Heading>
    );
  } else if (update <= 0 && active) {
    return (
      <Box d="flex">
        <Heading mr="10px">Loading new prices</Heading>
        <CircularProgress isIndeterminate color="green.300" />
      </Box>
    );
  } else if (!active) {
    return null;
  }
};

export default PortfolioRefreshing;
