import React from "react";
import { Box } from "@chakra-ui/react";
import { fetchLeaders } from "../util/lists/fetchLeaders";
import { List } from "../typescript/interfaces";
import LeaderBoards from "../components/LeaderBoards";
import IndexStack from "../components/IndexStack";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { NextPage } from "next";

export const getServerSideProps = async () => {
  const response: List[] = await fetchLeaders();

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      response,
    },
  };
};

interface HomeProps {
  response: {
    lists: List[];
    status: number;
  };
}

const Home: NextPage<HomeProps> = ({ response }) => {
  const { lists } = response;
  return (
    <Box
      m={{ base: "6% auto", lg: "4% auto" }}
      d={{ base: "block", lg: "flex" }}
    >
      <GoogleAnalytics />
      <IndexStack />
      <LeaderBoards topLists={lists} />
    </Box>
  );
};

export default Home;
