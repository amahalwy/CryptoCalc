import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Feature: React.FC<{
  title: string;
  desc: string;
  desc2: string;
  onClick: (r) => void;
}> = ({ title, desc, desc2, ...rest }) => {
  return (
    <Box
      p={5}
      w={{ base: "100%", lg: "45%" }}
      h={{ base: "100%", lg: "430px", xl: "320px" }}
      bg="white"
      shadow="md"
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      mb={{ base: "20px", lg: "0" }}
      {...rest}
    >
      <Heading fontSize={{ base: 30, lg: 40 }}>{title}</Heading>
      <Text mt={4} fontSize={{ base: 14, lg: 20 }}>
        {desc}
      </Text>
      <Text mt={4} fontSize={{ base: 14, lg: 20 }}>
        {desc2}
      </Text>
    </Box>
  );
};

const StackEx = () => {
  const router = useRouter();
  return (
    <Box
      h="100%"
      m="0 auto"
      alignItems="center"
      justifyContent="space-between"
      w={{ base: "90%", lg: "80%" }}
      d={{ base: "block", lg: "flex" }}
    >
      <Feature
        title="Cryptocurrency Calculator"
        desc="Create a portfolio with available crypto currencies and a $1 million budget. How much money can you make?"
        desc2="Get started here and challenge the leaderboards!"
        onClick={() => router.push("calc")}
      />
      <Feature
        title="Your Cryptocurrency Portfolio"
        desc="See how you wage against others. If you've already made a portfolio, check out how much you've made so far!"
        desc2="You have 3 total days before a final value change is registered. Goodluck!"
        onClick={() => router.push("portfolio")}
      />
    </Box>
  );
};

const Home = () => {
  return (
    <Box m={{ base: "6% auto", lg: "10% auto" }} w="100%">
      <LeaderBoards />
      <StackEx />
    </Box>
  );
};

export default Home;
