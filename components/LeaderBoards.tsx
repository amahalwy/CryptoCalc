import React from "react";
import { Box, Flex, Divider, Text } from "@chakra-ui/react";
import { LeaderBoardsProps } from "../typescript/interfaces";
import LeaderBoardItem from "./LeaderBoardItem";
import THead from "./THead";

const LeaderBoards: React.FC<LeaderBoardsProps> = ({ topLists }) => {
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
      m="5% auto"
      h={{ base: "100%", lg: "430px", xl: "320px" }}
      w={{ base: "90%", lg: "100%" }}
      bg="white"
      shadow="md"
      borderWidth="1px"
      alignItems="center"
      minH={{ base: "100%", lg: "430px", xl: "320px" }}
      maxW={{ base: "xl", md: "7xl" }}
    >
      <Flex align="center" justify="space-between" px="6" py="4">
        <Text as="h2" fontWeight="bold" fontSize="2xl" color="orange.400">
          Leaderboards
        </Text>
      </Flex>
      <Divider />
      <Box p={{ lg: "20px" }}>
        {!topLists.length ? (
          <Box px="6" py="4">
            No leaders yet. Create a portfolio and lead the pack!{" "}
          </Box>
        ) : (
          <Box>
            <THead />
            <Divider />
            <Box maxH={{ base: "160px", lg: "800px" }} overflow="scroll">
              {topLists.map((list, i) => {
                return <LeaderBoardItem list={list} key={i} pos={i + 1} />;
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LeaderBoards;
