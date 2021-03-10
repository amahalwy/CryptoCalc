import React from "react";
import { Accordion, Box, Heading, OrderedList } from "@chakra-ui/react";
import { List } from "../typescript/interfaces";
import LeaderBoardList from "./LeaderBoardItem";

const LeaderBoards: React.FC<{ topLists: List[] }> = ({ topLists }) => {
  const [update, setUpdate] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (localStorage && !localStorage.cryptoCalcUpdate && !update) {
      localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
    }
    setUpdate(JSON.parse(localStorage.cryptoCalcUpdate));
    update > 0 &&
      update !== null &&
      setTimeout(() => {
        const newUpdate = Number(update) - 1;
        setUpdate(newUpdate);
        localStorage.setItem("cryptoCalcUpdate", JSON.stringify(newUpdate));
      }, 1000);
    if (update <= 0 && update !== null) {
      setTimeout(() => {
        setUpdate(180);
        localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
      }, 1000);
    }
  }, [update]);

  return (
    <Box
      order={2}
      p={5}
      bg="white"
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      mb={{ base: "20px", lg: "0" }}
      w={{ base: "90%", lg: "100%" }}
      m={{ base: "20px auto", lg: "0 auto" }}
      minH={{ base: "100%", lg: "430px", xl: "320px" }}
    >
      <Box w="100%">
        <Heading fontSize={{ base: 30, lg: 40 }} color="orange.400">
          Current Leaderboards
        </Heading>
      </Box>
      <Box
        p={{ base: "0", lg: "20px" }}
        maxH={{ base: "200px" }}
        overflow="scroll"
      >
        <Accordion allowToggle>
          <OrderedList spacing={6} p={2}>
            {topLists.map((list, i) => {
              return <LeaderBoardList list={list} key={i} />;
            })}
          </OrderedList>
        </Accordion>
      </Box>
    </Box>
  );
};

export default LeaderBoards;
