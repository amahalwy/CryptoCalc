import React from "react";
import { Box } from "@chakra-ui/react";
import { CountdownProps } from "../typescript/interfaces";

const CountDown: React.FC<CountdownProps> = ({ timerComponents }) => {
  return (
    <Box d="flex" w="100%" justifyContent="center" pb="10px">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </Box>
  );
};

export default CountDown;
