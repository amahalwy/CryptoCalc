import React from "react";
import { Box, Button, Text, Divider, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FeatureProps } from "../typescript/interfaces";

const Feature: React.FC<FeatureProps> = ({ title, desc, desc2, onClick }) => {
  return (
    <Box
      shadow="md"
      cursor="pointer"
      borderWidth="1px"
      px={{ md: "8" }}
      m={{ base: "0 auto 20px", lg: "0 auto" }}
      w={{ base: "100%", lg: "90%" }}
      h={{ base: "100%", lg: "430px", xl: "320px" }}
      maxW={{ base: "xl", md: "7xl" }}
      borderRadius="md"
      bg="white"
    >
      <Box maxW="3xl" mx="auto" rounded={{ md: "lg" }} overflow="hidden">
        <Flex align="center" justify="space-between" px={6} py={4}>
          <Text as="h2" fontWeight="bold" fontSize="2xl" color="orange.400">
            {title}
          </Text>
        </Flex>
        <Divider />
        <Box>
          <Flex px="6" py="4">
            <Box>{desc}</Box>
          </Flex>
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
