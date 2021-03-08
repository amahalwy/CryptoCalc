import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { fetchLeaders } from "../util/FetchLeaders";
import { List } from "../typescript/interfaces";

const LeaderBoards: React.FC<{ topLists: List[] }> = ({ topLists }) => {
  const [update, setUpdate] = React.useState<number | string>(180);

  console.log(topLists);

  return (
    <Box
      order={2}
      p={5}
      bg="white"
      shadow="md"
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      mb={{ base: "20px", lg: "0" }}
      w={{ base: "90%", lg: "100%" }}
      minH={{ base: "100%", lg: "430px", xl: "320px" }}
    >
      <Box w="100%" h="40%">
        <Heading fontSize={24} color="orange.400">
          Top 10 earners (%)
        </Heading>
      </Box>
      <Box>{}</Box>
    </Box>
  );
};

export default LeaderBoards;
