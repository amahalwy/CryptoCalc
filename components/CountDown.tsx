import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CountdownProps } from "../typescript/interfaces";

const CountDown: React.FC<CountdownProps> = ({ timerComponents }) => (
  <Flex w="100%" justifyContent="center" pb="10px">
    {timerComponents.length ? (
      timerComponents
    ) : (
      <Box>
        <Text fontSize={30} color="white">
          Time's up!
        </Text>
      </Box>
    )}
  </Flex>
);

export default CountDown;
