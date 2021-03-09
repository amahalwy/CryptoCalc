import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Feature: React.FC<{
  title: string;
  desc: string;
  desc2: string;
  [x: string]: any;
}> = ({ title, desc, desc2, ...rest }) => {
  return (
    <Box
      p={5}
      w={{ base: "100%", lg: "90%" }}
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
      w={{ base: "90%", lg: "100%" }}
      d="block"
    >
      <Feature
        title="New Portfolio"
        desc="Create a portfolio with available crypto currencies and a $1 million budget. How much money can you make?"
        desc2="Get started here and challenge the leaderboards!"
        onClick={() => router.push("calc")}
        mb="20px"
      />
      <Feature
        title="Portfolio Search"
        desc="See how you wage against others. If you've already made a portfolio, check out how much you've made so far!"
        desc2="You have 3 total days before a final value change is registered. Goodluck!"
        onClick={() => router.push("portfolio")}
      />
    </Box>
  );
};

export default StackEx;
