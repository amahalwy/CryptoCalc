import React from "react";
import { Box } from "@chakra-ui/react";
import StackEx from "../components/IndexStack";
import { fetchLeaders } from "../util/FetchLeaders";
import { List } from "../typescript/interfaces";
import LeaderBoards from "../components/LeaderBoard";
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

const Home = (props) => {
  return (
    <Box
      m={{ base: "6% auto", lg: "4% auto" }}
      w="95%"
      d={{ base: "block", lg: "flex" }}
    >
      <GoogleAnalytics />
      <LeaderBoards topLists={props.lists} />
      <StackEx />
    </Box>
  );
};

export default Home;
