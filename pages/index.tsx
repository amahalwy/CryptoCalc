import React from "react";
import { Box } from "@chakra-ui/react";
import StackEx from "../components/IndexStack";
import { fetchLeaders } from "../util/FetchLeaders";
import { List } from "../typescript/interfaces";
import LeaderBoards from "../components/LeaderBoard";

export const getServerSideProps = async () => {
  const lists: List[] = await fetchLeaders();

  if (!lists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      lists,
    },
  };
};

const Home = (props) => {
  return (
    <Box
      m={{ base: "6% auto", lg: "4% auto" }}
      w="95%"
      d={{ base: "block", lg: "flex" }}
    >
      <LeaderBoards topLists={props.lists} />
      <StackEx />
    </Box>
  );
};

export default Home;
