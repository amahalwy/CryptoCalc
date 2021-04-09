import React from "react";
import { Box } from "@chakra-ui/react";
import { fetchLeaders } from "../util/FetchLeaders";
import { List } from "../typescript/interfaces";
import LeaderBoards from "../components/LeaderBoards";
import IndexStack from "../components/IndexStack";
import GoogleAnalytics from "../components/GoogleAnalytics";

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

const Home = (props: { lists: List[] }) => {
  return (
    <Box
      m={{ base: "6% auto", lg: "4% auto" }}
      d={{ base: "block", lg: "flex" }}
    >
      <GoogleAnalytics />
      <IndexStack />
      <LeaderBoards topLists={props.lists} />
    </Box>
  );
};

export default Home;
