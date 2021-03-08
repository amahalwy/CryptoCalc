import { Box } from "@chakra-ui/react";
import React from "react";
import { TimerComponentProps } from "../typescript/interfaces";

const TimerComponent: React.FC<TimerComponentProps> = ({
  timeLeft,
  interval,
}) => {
  return (
    <Box p="10px" w="140px" bg="orange.200" m="0 10px" borderRadius="10px">
      <Box bg="orange.400">
        <Box bg="orange.300" p="20px 10px" d="flex" justifyContent="center">
          <Box fontSize={38} color="white">
            {timeLeft[interval]}
          </Box>
        </Box>
        <Box d="flex" justifyContent="center" mt="10px">
          <Box color="white" fontSize={24}>
            {interval}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TimerComponent;
