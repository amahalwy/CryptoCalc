import React from "react";
import { Box, Stack, HStack, VStack, Heading, Text } from "@chakra-ui/react";
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
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
      h="90%"
      bg="white"
      {...rest}
      cursor="pointer"
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
      d={{ base: "block", lg: "flex" }}
      spacing={8}
      alignItems="center"
      h="100%"
      w={{ base: "90%", lg: "100%" }}
      m="0 auto"
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
    <Box m="10% auto" w="100%">
      <StackEx />
    </Box>
  );
};

export default Home;
