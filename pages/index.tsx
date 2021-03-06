import React from "react";
import { Box, Stack, HStack, VStack, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Feature({ title, desc, desc2, ...rest }) {
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
      <Heading fontSize={40}>{title}</Heading>
      <Text mt={4} fontSize={20}>
        {desc}
      </Text>
      <Text mt={20} fontSize={20}>
        {desc2}
      </Text>
    </Box>
  );
}

function StackEx() {
  const router = useRouter();
  return (
    <HStack spacing={8} alignItems="center" h="100%" w="95%" m="0 auto">
      <Feature
        title="Cryptocurrency Calculator"
        desc="Create a portfolio with available crypto currencies and a $1 million budget. How much money can you make? "
        desc2="Get started here and challenge the leaderboards!"
        onClick={() => router.push("calc")}
      />
      <Feature
        title="Your Cryptocurrency Portfolio"
        desc="See how you wage against others. If you've already made a portfolio, check out how much you've made so far!"
        desc2="You have 3 total days before a final value change is registered. Goodluck!"
        onClick={() => router.push("portfolio")}
      />
    </HStack>
  );
}

const Home = () => {
  return (
    <Box m="10% auto" h="400px" w="60%">
      <StackEx />
    </Box>
  );
};

export default Home;
