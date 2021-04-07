import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Divider, Flex, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import { DescriptionProps, FeatureProps } from "../typescript/interfaces";

const Description: React.FC<DescriptionProps> = ({ value }) => {
  return (
    <Flex
      as="dl"
      direction={{ base: "column", sm: "row" }}
      px="6"
      py="4"
      _even={{ bg: mode("gray.50", "gray.600") }}
    >
      <Box as="dd" flex="1">
        {value}
      </Box>
    </Flex>
  );
};

const Feature: React.FC<FeatureProps> = ({ title, desc, desc2, onClick }) => {
  return (
    <Box
      maxW={{ base: "xl", md: "7xl" }}
      mx="auto"
      px={{ md: "8" }}
      w={{ base: "100%", lg: "90%" }}
      h={{ base: "100%", lg: "430px", xl: "320px" }}
      shadow="md"
      cursor="pointer"
      borderWidth="1px"
      mb={{ base: "20px", lg: "0" }}
    >
      <Box
        maxW="3xl"
        mx="auto"
        rounded={{ md: "lg" }}
        bg={mode("white", "gray.700")}
        shadow="base"
        overflow="hidden"
      >
        <Flex align="center" justify="space-between" px="6" py="4">
          <Text as="h2" fontWeight="bold" fontSize="2xl" color="orange.400">
            {title}
          </Text>
        </Flex>
        <Divider />
        <Box>
          <Description value={desc} />
        </Box>
        <Box d="flex" justifyContent="center" mb="4%">
          <Button children={desc2} onClick={onClick} />
        </Box>
      </Box>
    </Box>
  );
};

const IndexStack = () => {
  const router = useRouter();
  return (
    <Box
      h="100%"
      m="0 auto"
      alignItems="center"
      w={{ base: "90%", lg: "100%" }}
    >
      <Feature
        title="New Portfolio"
        desc="Create a crypto-currency portfolio with a $1 million budget. How much money can you make in 3 days?"
        desc2="Get started"
        onClick={() => router.push("calc")}
      />
      <Feature
        title="Portfolio Search"
        desc="See how you wage against others. If you've already made a portfolio, check out how much you've made so far."
        desc2="Search"
        onClick={() => router.push("portfolio")}
      />
    </Box>
  );
};

export default IndexStack;
